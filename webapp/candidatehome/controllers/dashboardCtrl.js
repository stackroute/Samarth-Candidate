/* DashboardCtrl controller -> responsible for dashboard and having $state,
 $auth and $rootScope as dependencies*/
angular.module('sm-candidateprofile')
    .controller('DashboardCtrl', [
        '$auth',
        '$rootScope',
        '$scope',
        'dashboardFactory',
        function(
            $auth,
            $rootScope,
            $scope,dashboardFactory) {
            $scope.uname = $auth.getPayload().uname;
            console.log("In dashboard "+$scope.uname);
              var bar  = $scope.uname;

            dashboardFactory.getCandidatebyID(bar).then(function(response) {
                console.log("hey");
                console.log(response.data);
                console.log($scope.profiling);
                vm.jobprovider = $scope.profiling[0];
                vm.checked = true;

            });
            /* =============================================
            =  Checking whether the user is authenticated
               or not.Based on user's authenticity .

                   if return of $auth.isAuthenticated() is->
                       "true" ->   signout flag in root
                                   scope is set to true
                                   i.e signout button is
                                   will be displayed in
                                   the navbar .
                       "false" ->  signout flag in root scope
                                   is set to false i.e signout
                                   button is will be hidden in
                                   the navbar .

               NOTE :- to check the sign declaration in rootscope
                       , check applayout/controllers/navctrl=
            =============================================*/

            if ($auth.isAuthenticated()) {
                // set to true if authenticated
                //$rootscope.sideNavLogo=true;
                $rootScope.sideNavLogo = true;
                $rootScope.signout = true;
                // $Scope.$parent.sideNavLogo = true;
                // set to loggedinbackground if authenticated i.e set the background as white
                $rootScope.loggedinbackground = 'loggedinbackground';
            } else {
                // set to false if not authenticated ex: in case session expiration
                $rootScope.signout = false;
                $rootScope.sideNavLogo = false;
                //$Scope.$parent.sideNavLogo = false;
                // set to loggedoutbackground if not authenticated
                $rootScope.loggedinbackground = 'loggedoutbackground';
            }

            /* =====  End of Section comment block  ======*/
        }
    ]);
