angular
	.module('imagXchange')
	.factory('photosFactory', photosFactory)

photosFactory.$inject = ['$http']

function photosFactory($http){
	var photosFactory = {}

	photosFactory.index = function(){
		return $http.get('https://localhost:3000/photos')//does their need to be a /api/photos here?
	}

	photosFactory.create = function(photo){
		return $http.post('https://localhost:3000/photos', photo)
	}

	photosFactory.destroy = function(photo){
		return $http.delete('https://localhost:3000/photos' + photo.id)
	}

	return photosFactory


}
