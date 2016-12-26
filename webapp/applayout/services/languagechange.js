angular.module('sm-candidateprofile')
    .factory('datagenerate', [
        '$http',
        '$log',
        function(
            $http,
            $log) {
            return {
                // getjson is a function which fetch the data from the api
                // this is the link of API "http://localhost:8080/resource/"
                getjson: function(key, lang) {
                    let data = {};
                    return $http({
                        method: 'GET',
                        url: '/resource/' + key + lang,
                        type: 'JSON'
                    }).then(function mySucces(response) {
                        data = response.data;
                        return data;
                    }, function errorCallback(response) {
                        $log.error(response);
                        return 'err';
                    });
                }
            };
        }
    ]);