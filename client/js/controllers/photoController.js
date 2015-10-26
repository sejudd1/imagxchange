angular
	.module('imagXchange')
	.controller('PhotosController', PhotosController);
//inject the $http
PhotosController.$inject = [ '$state', '$http' ]
//PhotosController.$inject = [ 'photosFactory' ]

//refer to the photo module
function PhotosController( $state, $http ){
	
	var vm = this

	vm.photos = []
	vm.photo = {}
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

PhotosController.prototype.viewPhotos = function(id) {
	console.log("Working")

	var vm = this

	console.log("viewphotos function is running " + id)

	vm.$http
		.get( "http://localhost:8080/api/photos/" + id )

		.then( response => {

		vm.photo = response.data

			console.log(vm.photo)


		window.location.href = "#/photos/" + response.data._id



		})


}






