angular.module('sm-skillprofile')
    .factory('signupFactory', ['$http', '$q', function($http, $q) {
        var signupfact = {
            postsignup: function(user) {
                console.log("data in factory of signup", user);
                return $http({
                    'method': 'POST',
                    'url': 'http://localhost:8081/candidate/' + user.mobile,
                    'data': user,
                    'content-type': "application/json"
                }).then(function(res) {
                    return res;
                }, function(err) {
                    return err;

                });
            },
            getsignup: function(getuser) {
                return $q(function(resolve, reject) {

                    $http.get('/candidate/' + getuser)

                    .then(function(res) {
                            console.log("response in factory", res);
                            resolve(res.data);
                        }, function(res) {
                            return (res.data);
                            console.log("bye");
                        }

                    );
                });
            }


        }
        return signupfact;
    }]);
