angular
	.module('imagXchange')
	.controller('PhotoController', PhotoController);
//inject the $http
//PhotoController.$inject = [ 'photosFactory', ]

//refer to the photo module
function PhotoController($http){

	var vm = this

	vm.photos = []

	$http.get('http://localhost:8080/api/photos')
		.then(function(response){
		vm.photos = response.data
		console.log(vm)
	})
}





