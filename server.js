var express 		= require( 'express' ),
	app				= express(),
	app 			= require( './api/index'),
	bodyParser		= require( 'body-parser'),
	morgan			= require( 'morgan' ),
	mongoose 		= require( 'mongoose' ),
	userapiRouter	= require( './api/routes/userRoutes' ),
	photoapiRouter	= require( './api/routes/photoRoutes' ),
	cors			= require( 'cors' ),
	path			= require( 'path');



mongoose.connect( 'mongodb://localhost:27017/imagxchange')

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

