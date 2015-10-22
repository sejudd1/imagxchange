var express 		= require( 'express' ),
	apiRouter 		= require express.Router(),
	usersController = require( './controllers/usersController'),
	jwt				= require( 'jsonwebtoken' ),
	mySpecialSecret = "paparazzi",
	User 			= require( './models/User');

apiRouter.route('/authenticate')
	.post(function( req, res ){
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

apiRouter.route('/users')