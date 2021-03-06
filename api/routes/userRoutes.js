var express 		= require( 'express' ),
	userapiRouter 	= express.Router(),
	usersController = require( '../controllers/usersController'),
	jwt				= require( 'jsonwebtoken' ),
	mySpecialSecret = "paparazzi",
	User 			= require( '../models/User');

userapiRouter.route('/')
	.get(usersController.index)


userapiRouter.route('/authenticate')

	.post(function( req, res ) {

		console.log("trying to generate a JWT")
	// finds one user
	User.findOne({
		email: req.body.email
	}).select('email password').exec(function(err, user){
		if( err ) throw err
		if( !user ){
			res.json({success: false, message: "auth failed"})
		} else if( user ){
			//check the user password
			var validPassword = user.comparePassword(req.body.password)
			if(!validPassword){
				res.json({success: false, message: "auth failed"})
			} else {
				//password if good, assign jwt
				var token = jwt.sign({
					email: user.email
				}, mySpecialSecret, {
					expiresInMinutes: 1000
				})
				//gives a jwt
				res.json({ success: true, message: "enjoy the token", token: token})

			}
		}
	})
})

userapiRouter.route('/')
	.post( usersController.create )

userapiRouter.use(function( req, res, next ){

	var token = req.body.token || req.param( 'token' ) || req.headers['x-access-token']

	if( token ){
		jwt.verify( token, mySpecialSecret, function( err, decoded ){
			if( err ){
				res.status( 403 ).send({sucess: false, message: "forbidden, token can't be decoded"})
			} else {
				req.decoded = decoded
				next()
			}
		})
	} else {
		res.status( 403 ).send({success: false, message: "no token"})
	}

	console.log("checks to see if user if logged in")
})


userapiRouter.route('/me')
	.get(function( req, res) {
		res.send( req.decoded )
	})

userapiRouter.route('/:user_id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.destroy)

module.exports = userapiRouter