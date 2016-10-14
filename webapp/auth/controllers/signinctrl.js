angular.module('sm-skillprofile')

.directive('validPasswordC', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue, $scope) {
                    var noMatch = viewValue != scope.signupForm.password.$viewValue
                    ctrl.$setValidity('noMatch', !noMatch)
                })
            }
        }
    })
    .controller('signinController', ['$scope', '$http', '$state', 'signinFactory', 'signupFactory', '$rootScope', 'datagenerate', 'localStorageService', '$window',

        function($scope, $http, $state, signinFactory, signupFactory, $rootScope, datagenerate, localStorageService, $window) {

            $scope.loadLangData = function(lang) {
                datagenerate.getjson("section", lang).then(function(result) {

                    $scope.data = result;

                });
            }

            $scope.loadLangData(getItem("lang"));

            function getItem(key) {
                return localStorageService.get(key);
            }

            $rootScope.$on("lang_changed", function(event, data) {
                console.log("User switch to language ", data.language);
                $scope.loadLangData(data.language);

            });
            $scope.createUser = function() {
                    $scope.user = {

                        "name": $scope.name,
                        "mobile": $scope.phonenumber,
                        "email": $scope.email,
                        "password": $scope.password

                    }

                    signupFactory.postsignup($scope.user)
                        .then(function(result) {
                                console.log("data in contrller of signup", result);

                                if (result.data == "Candidate already exists, try editing instead...!") {
                                    $scope.message = "Mobile number already exist with other profile"
                                } else {
                                    $scope.message = "Successfully created click here to sign in";

                                }
                            },
                            function(data) {
                                $scope.error = "Error in creating new profile with the given mobile number";
                            })
                },



                $scope.login = function() {

                    $scope.user = {
                        "phonenumber": $scope.phonenumber,
                        "password": $scope.password

                    }
                    signinFactory.postsignin($scope.user)
                        .then(function(data) {
                            console.log("data in contrller", data.phonenumber);
                            $scope.error = data.error;

                            $scope.success = data.success;
                            console.log("Inside Signin Factury.....", data.phonenumber)

                        })
                    signinFactory.getsignin($scope.user)
                        .then(function(data) {
                                console.log("data in get contrller", data.phonenumber);
                                $scope.error = data.error;

                                $scope.success = data.success;
                                console.log("Inside Signin Factury.....", data.phonenumber)
                                localStorageService.set('JWT', data.token);
                                var token = localStorageService.get('JWT');
                                $http.defaults.headers.common.Authorization = data.token;

                                if (token == data.token && $scope.success == true) {
                                    console.log("token", token + "data.token", data.token)
                                    $state.go("skillprofile.skillhome");
                                } else {
                                    $state.go("skillprofile.signin");
                                }
                            },
                            function(data) {
                                $scope.error = data.error;

                            })
                }



        }

    ]);
