angular.module('sm-skillprofile')
    .controller('signoutCtrl', ['$rootScope', '$scope', '$state',
        'UserAuthService', 'LangService', 'datagenerate',
        function($rootScope, $scope, $state, UserAuthService, LangService,
            datagenerate, localStorageService) {
            $scope.loadLangData = function(lang) {
                datagenerate.getjson("section", lang).then(function(result) {
                    $scope.resourceData = result;
                });
            }
            $scope.loadLangData(LangService.getLang());

            $rootScope.$on("lang_changed", function(event, data) {
                $scope.loadLangData(data.language);
            });

            $scope.signout = function() {
                $scope.error = "";
                //localStorageService.remove("User");
                UserAuthService.signout()
                    .then(function(res) {
                            //Alternatively you can redirect user to landing page
                            $rootScope.$emit("callparentmethod", {});
                            $state.go("skillprofile.signin");
                        },
                        function(err) {
                            $scope.error = err;
                            $state.go("skillprofile.signin");
                            console.log('Error: ', err);
                        });
            }
            $scope.signout();
        }
    ]);
