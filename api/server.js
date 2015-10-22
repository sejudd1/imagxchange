var express 	= require( 'express' ),
	app			= express (),
	bodyParser	= require( 'body-parser'),
	morgan		= require( 'morgan' ),
	port 		= process.env.PORT || 8080,
	mongoose 	= require( 'mongoose' ),
	apiRouter	= require( './routes/userRoutes' )
	cors		= require( 'cors' );


mongoose.connect( 'mongodb://localhost:27017/imagxchange')

//sets up middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(morgan( 'dev' ))

app.use('/api', apiRouter) //sends any get request with api prefix to the api router

app.listen(port)
console.log("listening on port" + port)