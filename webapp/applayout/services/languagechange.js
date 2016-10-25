/* Datagenerate is responsible for navbar and having $http as dependencies*/
angular.module('sm-candidateprofile')
    .factory('datagenerate', function($http) {
        return {
            //getjson is a function which fetch the data from the api
            /**
             this is the link of API "http://localhost:8081/resource/"
             */
            getjson: function(key, lang) {  

                //console.log("key -----------> " + key + "    lang ----->" + lang);
                var data = {};
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/resource/' + key + lang,
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;
                   // console.log(data);
                    return data;

                }, function errorCallback(response) {
                    
                   if((key+lang)!="navlanguage")
                   {
                      return "err";
                   }
                });
            }

        };
    });
