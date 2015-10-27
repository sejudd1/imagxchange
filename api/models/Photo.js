var mongoose	= require( 'mongoose' ),
	Schema 		= mongoose.Schema;
	

// creates an image

	PhotoSchema = new Schema({
		title: {type: String, require: true},
		caption: {type: String, require: true},
		subject: String,
		user: String,
		location: String,
		datetaken: Date,
		startingprice: {type: Number, require: true},
		currentprice: {type: Number, require: true},
		created_at: Date

	})

PhotoSchema.methods.counterStart = function() {
	var photo = this
	if (photo.currentprice > photo.startingprice){
			setInterval(function(){
				if (photo.currentprice <= photo.startingprice) {
					return true;
				} else {
				photo.currentprice = (photo.currentprice - 1)
				console.log( photo.currentprice )
				console.log("set intervial working")
				} },
				// photo.currentprice = ( photo.currentprice -1) }, 
				1000)
			};
	return true;
}


module.exports = mongoose.model( 'Photo', PhotoSchema )
