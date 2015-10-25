var Photo = require( '../models/Photo');

function index ( req, res ) {
	//gets all photo
	Photo.find( function( err, photos ) {
		if( err ) res.send ( err )
			res.json( photos )
	})
}

function create( req, res ) {
	//makes a photo 
	var photo = new Photo()

	photo.title			= req.body.title
	photo.caption		= req.body.caption
	photo.subject		= req.body.subject
	//photo.user			= req.body.global.username
	photo.location		= req.body.location
	photo.datetaken		= req.body.datetaken

	photo.save( function( err ) {
		if( err ) res.send 
			res.json({success: true, message: "photo created"})
	})
}

function show( req, res ) {
	//gets a single image
	Photo.findById( req.params.photo_id, function( err, photo ) {
		if( err ) res.send( err )
			res.json( photo )
	})
}

function update( req, res ) {
	//update a photo
	Photo.findById( req.params.photo_id, function( err, photo) {
		if( err ) res.send( err )

		if( req.body.title ) photo.title 	= req.body.title
		if( req.body.price ) photo.price 	= req.body.price
		if( req.body.date ) photo.date		= req.body.date

		photo.save( function( err ) {
			if( err ) res.send( err )
			res.json( {success: true, message: "photo has been udpated"})
		})
	})
}

function destroy ( req, res ) {
	//deletes a deal
	Photo.remove( {
		_id: req.params.deal_id
	}, function( err, deal ) {
		if( err ) res.send( err )
		res.json( {success: true, message: "Your photo has been destroyed!"})
	})
}

module.exports = {
	index	: index,
	create 	: create,
	show	: show,
	update	: update,
	destroy : destroy
}

