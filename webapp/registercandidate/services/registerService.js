angular.module('sm-candidateprofile')
    .service('professionService', ['$http', function($http) {
        var objprofile = {};
        // var userdata = $window.localStorage["member-user"];
        //gets the circle from neo4j and mongo
        objprofile.profession = function() {
            return $http.get('/placement/profession')
                .then(function(res) {
                    // console.log("got profession ", res);
                    return res;
                }, function(error) {
                    return error;
                });
        }
        return objprofile;
    }])
    .factory('locationFacto',
        function($http) 
    {
        var factory = {
            locationReq :locationReq
        };
        return factory;
        function locationReq() {
            var req = {};
            req.url = '/placement/location';
            req.method = 'GET';
            return $http(req);
        };
    })
    .factory('centerPlacement', ['$http',
    function($http) {
        return {
            getCenterName: function(city) {
                // console.log(city);
                return $http({
                    method: 'get',
                    url: '/placement/getPlacementCenter/'+ city,
                }).then(function(response) {
                    console.log(response);
                    return response.data;
                }, function error(err) {
                    // console.log("error", err);
                });
            }
        }
    }
    ]);
