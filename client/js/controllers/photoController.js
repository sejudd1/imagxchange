angular
	.module('imagXchange')
	.controller('PhotosController', PhotosController);
//inject the $http
//PhotosController.$inject = [ 'photosFactory' ]

//refer to the photo module
function PhotosController($http){
	
	var vm = this

	vm.photos = []
	vm.newPhoto = {}
	vm.$http = $http
	vm.getPhotos()
}

//gets all photos 
PhotosController.prototype.getPhotos = function() {

	var vm = this

	vm.$http
		.get( "http://localhost:8080/api/photos" )
		.then( response => {
			vm.all = response.data
			console.log(response)
			console.log(vm.all)
		})
}






