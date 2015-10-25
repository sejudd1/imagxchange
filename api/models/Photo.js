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
		created_at: Date
	})

// PhotoSchema.pre( 'save', function( next ){
// 	this.created_at = new Photo();
// 	next();
// });

module.exports = mongoose.model( 'Photo', PhotoSchema )
