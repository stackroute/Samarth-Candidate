/* DashboardCtrl controller -> responsible for dashboard and having $state, $auth and $rootScope as dependencies*/
angular.module('sm-candidateprofile').controller('DashboardCtrl', ['$state', '$auth', '$rootScope', function($state, $auth, $rootScope) {
 

    /*=============================================
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
               , check applayout/controllers/navctr =
    =============================================*/

    if ($auth.isAuthenticated()) {
        $rootScope.signout = true; // set to true if authenticated
        $rootScope.loggedinbackground = "loggedinbackground";//set to loggedinbackground if authenticated i.e set the background as white
    } else {
        $rootScope.signout = false; // set to false if not authenticated ex: in case session expiration
        $rootScope.loggedinbackground = "loggedoutbackground";// set to loggedoutbackground if not authenticated
    }

    /*=====  End of Section comment block  ======*/

}]);
