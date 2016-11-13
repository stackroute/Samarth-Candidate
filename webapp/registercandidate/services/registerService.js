angular.module('sm-candidateprofile')
    .service('professionService', ['$http', function($http) {
        var objprofile = {};
        // var userdata = $window.localStorage["member-user"];

        //gets the circle from neo4j and mongo
        objprofile.profession = function() {

            return $http.get('/candidate/profession')
                .then(function(res) {
                    console.log("got ", res);
                    return res;
                }, function(error) {
                    return error;
                });
        }
        return objprofile;
    }]);
