/* RegisterCtrl controller -> responsible for authentication and hhaving $state, $auth as dependencies*/
angular.module('sm-candidateprofile').controller('RegisterCtrl', ['Flash', '$state', '$auth', '$rootScope', '$mdToast', function(Flash, $state, $auth, $rootScope, $mdToast) {
    let vm = this;
    vm.user = {};
    /* Login() function which will be actually called in the associated view for
    registering the user*/
    vm.register = function __register() {
        /* $auth.signup() is a predefined function provided by satellizer for initiating registration
        of the user . This returns a promise and accepts an object with all the required fields which
        needs to be sent to the api for registration

        NOTE :- To change the registration api endpoint/URI , please override $authProvider.signupUrl with new
        value in /auth/authmodule.js */
        $auth.signup({

            name: vm.user.name,
            mobile: vm.user.number,
            email: vm.user.email,
            location: vm.user.location,
            pwd: vm.user.password

        }).then(function(response) {
            let message = 'Successfully completed registration..!';
            Flash.create('danger', message);

            $state.go('candidate.dashboard'); // redirects to a mentioned state if successfull
        }).catch(function(response) {
            let message = 'Some Error ! Please Try Again';
            Flash.create('danger', message);
        }); // $auth.signup ends
    };
}]);
