angular
	.module('imagXchange')
	.factory('photosFactory', photosFactory)

photosFactory.$inject = ['$http']

function photosFactory($http){
	
	var photosFactory = {}

	var baseUrl = "http://localhost:8080/api/photos"

	photosFactory.index = function(){
		return $http.get(baseUrl)//does their need to be a /api/photos here?
	}

	photosFactory.create = function(photo){
		return $http.post(baseUrl, photo)
	}

	photosFactory.destroy = function(photo){
		return $http.delete(baseUrl + photo.id)
	}

	return photosFactory


}
