
  angular
    .module('sm-candidateprofile')
	.factory('navFactory', navFactory);
	function navFactory($http) {
		var factory = {getSidenav:getSidenav};
		return factory;
		function getSidenav() {
			console.log("af");
			var req = {};
			req.url = '/sidenavbar';
			req.method = 'GET';
			return $http(req);
		};
	}


