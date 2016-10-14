angular.module('sm-skillprofile')
    .factory('signinFactory', ['$rootScope', '$http', '$q', 'localStorageService', function($rootScope, $http, $q, localStorageService) {
        var signinfact = {
            postsignin: function(postuser) {
                console.log(postuser);

                return $q(function(resolve, reject) {
                    $http.post('/user/', postuser)
                        .then(function(res) {
                            console.log("Inside signin factory", res);
                            resolve(res.data);
                        }, function(res) {
                            return (res.data);
                        });
                });
            },
            getsignin: function(getuser) {
                console.log(getuser);

                return $q(function(resolve, reject) {
                    $http.post('/auth/', getuser)
                        .then(function(res) {
                            console.log("Inside signin factory", res)
                            $rootScope.hidetoggle = false;
                            console.log("checking toggle menu", $rootScope.togglemenu);
                            // $rootScope.candidateid = res.data.data[0].mobile;
                            // console.log("Candidateid from signin factory=", $rootScope.candidateid);
                            try {
                                $rootScope.candidateid = res.data.data[0].mobile;
                                localStorageService.set("candidateid", $rootScope.candidateid);

                                $rootScope.showSignout = true;
                                console.log("Show signout", $rootScope.showSignout)
                            } catch (err) {
                                localStorageService.remove("candidateid");
                                $rootScope.showSignout = false;
                                console.log("Invalid credentials");
                            }
                            resolve(res.data);
                        }, function(res) {
                            return (res.data);
                        });
                });
            },
        }
        return signinfact;
    }]);
