var mongoose	= require( 'mongoose' ),
	Schema 		= mongoose.Schema,
	userSchema	= require( './User');

// creates an image

	ImageSchema = new Schema( {
		title: {type: String, require: true},
		caption: {type: String, require: true},
		subject: String,
		location: String,
		datetaken: Date,
		created_at: Date
	})

ImageSchema.pre( 'save', function( next ){
	this.created_at = new Image();
	next();
});

module.exports = mongoose.model( 'Image', ImageSchema )
