angular.module('sm-skillprofile')
    .factory('datagenerate', function($http) {
        return {
            getjson: function(key, lang) {
                var data = {};
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/resource/' + key + lang,
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;


                    console.log(data);
                    return data;

                }, function errorCallback(response) {
                    return (response.error.message);
                });
            }

        };
    });
