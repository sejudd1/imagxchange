angular
	.module('imagXchange', [ 'ui.router' ] )
	.config(interceptor)
	.config(MainRouter)

function interceptor($httpProvider){
	$httpProvider.interceptors.push( 'authInterceptorFactory' )
}

function MainRouter($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html'
		})

		//add other pages for mainRouter here
		
		.state('loggedOut', {
			url: '/loggedOut',
			templateUrl: 'templates/home.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html'
		})
		.state('gallery', {
			url: '/gallery',
			templateUrl: 'templates/gallery.html'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'templates/contact.html'
		})
		.state('photo', {
			url: '/photo',
			templateUrl: 'templates/photo.html'
		})
		.state('photos', {
		 	url: '/photos/:photoId',
		 	templateUrl: 'templates/photo.html',
		 	controller: function($stateParams){
      			$stateParams.photoId  
   			}
		})


}