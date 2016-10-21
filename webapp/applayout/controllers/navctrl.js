/**
 *
 * 
 NOTE 1 :-"sm-candidateprofile" module can be found in root folder smcandidateprofile.js
      2 :-navCtrl controller is reponsible for displayed the navbar and uses 
        $rootScope, $scope, datagenerate, $state, $auth as dependencies
      3 :-datagenerate dependency is a factory and can be found in applayout/services/languagechange.js
 *
 */

angular.module("sm-candidateprofile")
    .controller('navCtrl', ['$rootScope', '$scope', 'datagenerate', '$state', '$auth', function($rootScope, $scope, datagenerate, $state, $auth) {

        /* Global element signout exists in the root scope of the application and is used to control
        the visiblility of the signout button in the navbar */

        $rootScope.signout = false;

        //loadnavlang() function is used to get the data from resources.json file in language object
        $scope.loadnavlang = function() {

            /* getjson() function is defined in factory datagenerate */
            
            datagenerate.getjson("nav", "language").then(function(result) {

                //console.log("result inside datagenerate", result[0]);
                $scope.language = {
                    English: result[0].English,
                    Hindi: result[0].Hindi,
                    Punjabi: result[0].Punjabi,
                    Bengali: result[0].Bengali,
                    Tamil: result[0].Tamil,
                    Telugu: result[0].Telugu,
                    Kannada: result[0].Kannada,
                    Gujarati: result[0].Gujarati,
                    Marathi: result[0].Marathi,
                    Urdu: result[0].Urdu,
                    Sindhi: result[0].Sindhi,
                    Malayalam: result[0].Malayalam


                };


            }); //end datagenerate
        };

        $scope.loadnavlang(); // calling loadnavlang  for loading data initially

        /*logout() function which will be actually called in the associated view for 
        loggin out the user*/
        $scope.logout = function() {
            /*$auth.logout() is a predefined function provided by satellizer for destroying session or 
            deleting JWT of the user. */
            $auth.logout();
            $rootScope.signout = false; // resetting the visibility of the flag to hide signout button on logout
            $state.go('candidate.login'); // redirects to a mentioned state if successfull
        }; //logout ends


    }]);
