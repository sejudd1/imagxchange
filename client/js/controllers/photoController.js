angular
	.module('imagXchange')
	.controller('PhotosController', PhotosController);
//inject the $http
PhotosController.$inject = [ '$http' ]
//PhotoController.$inject = [ 'photosFactory' ]

//refer to the photo module
function PhotosController( $http ){
	
	var vm = this

	vm.photos = []
	vm.newPhoto = {}
	vm.$http = $http
	vm.getPhotos()
	//vm.viewPhotos
}

//gets all photos 
PhotosController.prototype.getPhotos = function() {

	console.log("got here")

	var vm = this

	vm.$http
		.get( "http://localhost:8080/api/photos" )
		.then( response => {
			vm.all = response.data
			console.log(response)
			console.log(vm.all)
	})
}

PhotosController.prototype.viewPhotos = function(id) {
	console.log("Working")

	var vm = this

	// console.log(vm)

	vm.$http
		.get( "http://localhost:8080/api/photos/" + id )
		.then( response => {
			console.log(response)
		})

}






