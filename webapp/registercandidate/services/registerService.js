angular.module('sm-candidateprofile')
    .service('professionService', ['$http', function($http) {
        var objprofile = {};
        // var userdata = $window.localStorage["member-user"];
        // console.log(userdata);

        //gets the circle from neo4j and mongo
        objprofile.profession = function() {
            // console.log("ger citcle", userdata);

            return $http.get('/candidate/profession')
                .then(function(res) {
                    console.log("got ", res);
                    return res;
                }, function(error) {
                    // console.log(res);
                    return error;
                });
        }
        return objprofile;
    }]);
