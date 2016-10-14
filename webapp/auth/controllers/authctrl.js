angular.module('sm-skillprofile')
    .controller('authCtrl', ['$rootScope', '$scope', '$state', 'UserAuthService',
        'LangService', 'datagenerate',
        function($rootScope, $scope, $state, UserAuthService, LangService,
            datagenerate) {
            $scope.loadLangData = function(lang) {
                datagenerate.getjson("section", lang).then(function(result) {
                    $scope.resourceData = result;
                });
            };
            $scope.loadLangData(LangService.getLang());

            var goToHome = function() {
                //Skill Home is the dashboard for the user
                $state.go("skillprofile.skillhome");
            };

            $scope.signin = function() {
                $scope.error = "";
                UserAuthService.signIn($scope.user).then(function(user) {
                    goToHome();
                }, function(err) {
                    console.log("Error in signin: ", err);
                    $scope.error = err.error;
                });
            };

            $scope.signup = function() {
                $scope.message = "";
                UserAuthService.signUp($scope.user).then(function(user) {
                    $scope.message = "Successfully completed signup..!";
                    goToHome();
                }, function(err) {
                    console.log("Error in signin: ", err);
                    $scope.message = err.error;
                });
            }

            $rootScope.$on("lang_changed", function(event, data) {
                $scope.loadLangData(data.language);
            });
        }
    ]);
