/* Login controller -> responsible for authentication and hhaving $state, $auth as dependencies*/
angular.module('sm-candidateprofile').controller('LoginCtrl', ['$state', '$auth' , function($state, $auth) {

    var vm = this;
    vm.user = {};
    /*Login() function which will be actually called in the associated view for 
    authentication of the user*/
    vm.login = function() {
        // console.log(vm.user);

        /*$auth.login() is a predefined function provided by satellizer for initiating authentication
        of the user . This returns a promise and accepts an object with all the required fields which 
        needs to be sent to the api for authentication
        
        NOTE :- To change the login api endpoint/URI , please override $authProvider.loginUrl with new 
        value in /auth/authmodule.js */
        $auth.login({
            uname: vm.user.number, // username of the user entered in the login form
            pwd: vm.user.password // username of the user entered in the login form
        }).then(function(response) {

            $state.go('candidate.dashboard'); // redirects to a mentioned state if successfull

        }).catch(function(response) {

            window.alert('Error: Login failed'); // alert msg on error 
            //@Todo Logic to handle error

        }); // $auth.login ends
    };

            
}]);
