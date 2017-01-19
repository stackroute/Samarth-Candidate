/* Login controller -> responsible for authentication and hhaving $state, $auth as dependencies*/
angular.module('sm-candidateprofile')
    .controller('LoginCtrl', [
        '$auth',
        '$http',
        '$localStorage',
        '$log',
        '$state',
        'Flash',
        function(
            $auth,
            $http,
            $localStorage,
            $log,
            $state,
            Flash) {
            let vm = this;
            vm.user = {};
            /* Login() function which will be actually called in the associated view for
            authentication of the user*/
            vm.login = function() {
                // console.log(vm.user);

                /* $auth.login() is a predefined function provided by satellizer
                for initiating authentication of the user . This returns a promise
                and accepts an object with all the required fields which needs to be
                sent to the api for authentication

                NOTE :- To change the login api endpoint/URI , please override
                $authProvider.loginUrl with new value in /auth/authmodule.js */
                $auth.login({
                    // username of the user entered in the login form
                    uname: vm.user.number,
                    // username of the user entered in the login form
                    pwd: vm.user.password
                }).then(function(response) {
                    $log.error('response --->', response);
                    $auth.setToken(res.token);
                    $localStorage.tokenDetails = { token: $auth.getPayload()['sm-token'] };
                    $http.defaults.headers.common['x-access-token'] = $auth.getPayload()['sm-token'];
                    // redirects to a mentioned state if successfull
                    $state.go('candidate.dashboard');
                }).catch(function(response) {
                    $log.error('Login Failed ---->', response)
                    let message = 'Login Failed ! UserName or Password doesnot match .';
                    Flash.create('danger', message);
                    // window.alert('Error: Login failed'); // alert msg on error
                    // @Todo Logic to handle error
                });
                // $auth.login ends
            };
        }
    ]);
