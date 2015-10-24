angular
	.module('imagXchange')
	.controller('UserPhotosController', UserPhotosController);
//inject the $http
UserPhotosController.$inject = [ 'photosFactory' ]

//refer to the photo module
function UserPhotosController(photosFactory){
	this.all = []
	this.newPhoto = {}
	this.$http = $http
	this.getPhotos()
}

//get the user photos 
UserPhotosController.prototype.getPhotos = function () {
	this.$http
		.get( "http://localhost:3000/photos" )
		.then( response => {
			this.all = response.data.photos 
		})
}

//user can add a photo
UserPhotosController.prototype.addPhoto = function () {
	this.$http
		.post( "http://localthost:3000/photos", this.newPhoto )
		.then( ( response ) => {
		 this.getPhotos()
		})
	this.newPhoto = {}
}

//user can delete their photo
UserPhotosController.prototype.deletePhoto = function ( photo ){
	this.$http
		.delete( "http//localthost:3000/photos/" + photo._id )
		.then( response => {
			var index = this.all.indexOf( photo )
			this.all.splice( index, 1 )
		})
}
