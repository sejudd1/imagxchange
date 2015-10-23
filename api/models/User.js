var mongoose	= require( 'mongoose' ),
	Schema		= mongoose.Schema,
	bcrypt		= require( 'bcrypt-nodejs' );

//makes a new User schema

var UserSchema = new Schema ({
	email: 		{ type: String, required: true, unique: true },
	password: 	{ type: String, required: true, select: false},
	isphotographer: false,
	ispublisher: false	
})

//hash the pword of the user before saved

UserSchema.pre('save', function(next){
	var user = this;

	//if the user is new or if any changes hash the pword
	if(!user.isModified( 'password' )) return next()

	bcrypt.hash(user.password, null, null, function(err, hash){
		
		//if error move on
		if(err) return next(err)

		//if no error set the pword to teh hash and save
		user.password = hash
		next()	
	})
})

//compare incoming pwords with hashed pwords
UserSchema.methods.comparePassword = function(password){
	var user = this;
	return bcryt.compareSync(password, user.password)
}

module.exports = mongoose.model('User', UserSchema)

