var express 		= require( 'express' ),
	app				= express(),
	port 			= process.env.PORT || 8080,
	bodyParser		= require( 'body-parser'),
	morgan			= require( 'morgan' ),
	mongoose 		= require( 'mongoose' ),
	userapiRouter	= require( './api/routes/userRoutes' ),
	photoapiRouter	= require( './api/routes/photoRoutes' ),
	cors			= require( 'cors' ),
	path			= require( 'path' ),
	//define route handler
	http			= require( 'http' ).Server(app),
	//define twitter handler
	Twit            = require( 'twit' ),
	io				= require( 'socket.io' )(http),
	stream;
	

var twitter	= new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream = twitter.stream('statuses/filter', { track: 'george clooney' });



mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imagxchange')

//links the server to the client static pages
app.use(express.static(__dirname + '/client'))

//sets up middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(morgan( 'dev' ))

//sets the global user

app.use( function ( req, res, next ){
	console.log( global.user )
	global.user = req.user;
	next()
});

app.use('/api/users', userapiRouter) //sends any get request with api prefix to the api router
app.use('/api/photos', photoapiRouter)

app.get('*', function( req, res ){
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

//socket io app.get function
app.get('/', function(req, res){
	res.sendfile('index.html');
});

http.listen(port, function(){
	console.log('listening on :' + port);
});

//setting up server side websocket for twitter
io.on('connection', function(socket) {
	stream.on('tweet', function(tweet) {
		socket.emit('tweets', tweet);
	});
});

//tiddy up tweet data
stream.on('tweet', function (tweet) {
var data = {};
	data.name = tweet.user.name;
	data.screen_name = tweet.user.screen_name;
	data.text = tweet.text;
	data.user_profile_image = tweet.user.profile_image_url;
	socket.emit('tweets', data);
	// setTimeout(function) {
	// 	socket.disconnect("Die")
	// }, 3000);

});

module.exports = app;

