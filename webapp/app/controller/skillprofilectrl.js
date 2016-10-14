angular.module("sm-skillprofile")
    .controller('skillprofilectrl', ['$scope',
        "$state",
        "UserAuthService",
        "$rootScope",
        function($scope, $state, UserAuthService, $rootScope) {

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState) {
                    //Sates which don't need authentication
                    //signup, signin, signout
                    if (toState.name == 'skillprofile.signup' ||
                        toState.name == 'skillprofile.signin' ||
                        toState.name == 'skillprofile.signout') {
                        return;
                    }

                    //If user is not authenticated, but trying to navigate to a state, force the user to login
                    if (!UserAuthService.isMember()) {
                        event.preventDefault(); // stop current execution
                        $state.go('skillprofile.signin');
                        return;
                    }

                });

            $rootScope.$on('member-unauthorized', function() {
                UserAuthService.signout().then(function(res) {
                        $state.go("skillprofile.signin");
                    },
                    function(res) {
                        console.log('Error in signing out ', res)
                        $state.go("skillprofile.signin");
                    });
            }); //end of handling member-unauthorized event
        } //end of controller
    ]);
