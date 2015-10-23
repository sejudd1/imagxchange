<<<<<<< HEAD
=======
var app = require( './api/index');


// app.set('port', process.env.PORT || 8080 )

//var server = app.listen(app.get('port'), function(){
	// console.log("Server is listening on port" + port)
//});	

>>>>>>> upstream/master
var express 		= require( 'express' ),
	app				= express(),
	bodyParser		= require( 'body-parser'),
	morgan			= require( 'morgan' ),
	port 			= process.env.PORT || 8080,
	mongoose 		= require( 'mongoose' ),
	userapiRouter	= require( './api/routes/userRoutes' ),
	photoapiRouter	= require( './api/routes/photoRoutes' ),
	cors			= require( 'cors' ),
	path			= require( 'path');


<<<<<<< HEAD
mongoose.connect( 'mongodb://localhost:27017/imagxchange')
=======
>>>>>>> upstream/master
//links the server to the client static pages
app.use(express.static(__dirname + '/client'))

//sets up middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(morgan( 'dev' ))

app.use('/api/users', userapiRouter) //sends any get request with api prefix to the api router
app.use('/api/photos', photoapiRouter)

app.get('*', function( req, res ){
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

<<<<<<< HEAD
app.listen(port)
console.log("listening on port" + port)
=======
// app.listen(port)
// console.log("listening on port" + port)

>>>>>>> upstream/master
