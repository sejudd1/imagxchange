angular.module('imagXchange')

.controller('MainController', MainController)

MainController.$inject = ['$state', 'authFactory', '$rootScope']

function MainController($state, authFactory, $rootScope){
	var vm = this
	vm.user = {}
	vm.loggedIn = authFactory.isLoggedIn()
	vm.signup = signup
	vm.login = login
	vm.logout = logout
	vm.getUser = getUser

	$rootScope.$on('$stateChangeStart', function(event, next, current) {
		vm.loggedIn = authFactory.isLoggedIn();	

		authFactory.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	function logout(){
		$state.go('loggedOut')
		authFactory.logout();
		
	}

	function getUser(){
		authFactory.getUser()
		.then(function(response){
			console.log(response)
		})
	}

	function signup(){
		authFactory.signup(vm.user.username, vm.user.password)
		.then(function(response){
			if(response.data.success){
				vm.login(vm.user.username, vm.user.password)
			} else {
				vm.error = response.data.message
			}
		})
	}

	function login(){
		authFactory.login(vm.user.username, vm.user.password)
		.then(function(response){
			if(response.data.success){
				$state.go("home")
			} else {
				vm.error = response.data.message
			}
		})
	}

}