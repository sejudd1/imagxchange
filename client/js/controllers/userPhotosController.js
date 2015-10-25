angular
	.module('imagXchange')
	.controller('UserPhotosController', UserPhotosController);

//upload a photo file - inject angular file upload directives and services
var app = angular.module('fileUpload', ['ngFileUpload']);
app.controller('photoCtrl', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout){
	$scope.uploadPic = function(file){
		file.upload = Upload.upload({
			url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
			data: {file: file, title: title, caption: caption, subject: subject, location: location, datetaken: datetaken},
		})
		file.upload.then(function (response){
			$timeout(function () {
				file.result = response.data;
			})
		  }, function (response) {
		  	if (response.status > 0)
		  		$scope.errorMsg = respnse.status + ': ' + response.data;
		  }, function (evt) {
		  	 //math.min is to fix IE which reports 200% sometimes?
		  	 file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		})
	}
}])
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
