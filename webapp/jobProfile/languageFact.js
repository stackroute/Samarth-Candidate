(function() {
	'use strict';
		angular
			.module('sm-candidateprofile')
			.factory('languageFact', ['$http', function($http)
			{
				function languageReq() {
					let req = {};
					req.url = '/coordinatorreg/language';
					req.method = 'GET';
					return $http(req);
				}
				let factory = {
					languageReq: languageReq
				};
				return factory;
			}]);
}());

