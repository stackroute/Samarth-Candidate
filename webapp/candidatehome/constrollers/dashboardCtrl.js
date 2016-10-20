/* DashboardCtrl controller -> responsible for dashboard and having $state, $auth as dependencies*/
angular.module('sm-candidateprofile').controller('DashboardCtrl', function($state, $auth) {

    var vm = this;

    /*logout() function which will be actually called in the associated view for 
    loggin out the user*/
    vm.logout = function __logout() {
    	/*$auth.logout() is a predefined function provided by satellizer for destroying session or 
    	deleting JWT of the user. */
        $auth.logout();
        $state.go('login'); // redirects to a mentioned state if successfull
    };//logout ends
});
