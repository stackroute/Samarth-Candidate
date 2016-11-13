/**
 *NOTE 1 :-"sm-candidateprofile" module can be found in root folder smcandidateprofile.js
      2 :-navCtrl controller is reponsible for displayed the navbar and uses
        $rootScope, $scope, datagenerate, $state, $auth as dependencies
      3 :-datagenerate dependency is a factory and can be found in
      applayout/services/languagechange.js
 *
 */

angular.module('sm-candidateprofile')
    .controller('navCtrl', [
        '$auth',
        '$mdSidenav',
        '$rootScope',
        '$scope',
        '$state',
        'datagenerate',
        'Flash',
        function($auth,
            $mdSidenav,
            $rootScope,
            $scope,
            $state,
            datagenerate,
            Flash
        ) {
            /* Global element signout exists in the root scope of the application and is used to
             control
            the visiblility of the signout button in the navbar */
            $rootScope.signout = false;
            $rootScope.sideNavLogo = false;
            console.log("Side nav logo" + $scope.sideNavLogo);

            /* loggedinbackground is defined in rootscope and sets the
            classname for the content ui-view declared
            in index.html dynamically .
            NOTE :- classes with required is defined in applayout/css/applayout.css
            */
            $rootScope.loggedinbackground = 'loggedoutbackground';

            // loadnavlang() function is used to get the data from resources.json
            // file in language object
            $scope.loadnavlang = function() {
                /* getjson() function is defined in factory datagenerate */

                datagenerate.getjson('nav', 'language').then(function(result) {
                    $rootScope.language = {};

                    for (let key in result[0]) {
                        if (result[0].hasOwnProperty(key)) {
                            $rootScope.language[key] = result[0][key];
                        }
                    }
                });
                // end datagenerate
            };
            // calling loadnavlang  for loading data initially
            $scope.loadnavlang();

            /* logout() function which will be actually called in the associated view for
            loggin out the user*/
            $scope.logout = function() {
                /* $auth.logout() is a predefined function provided by satellizer
                for destroying session or
                deleting JWT of the user. */
                $auth.logout();
                $rootScope.sideNavLogo = false;
                // resetting the visibility of the flag to hide signout button on logout
                $rootScope.signout = false;
                console.log("log out:" + $scope.sideNavLogo);
                // resetting the visibility of the content view backgound  in index.html
                $rootScope.loggedinbackground = 'loggedoutbackground';
                // redirects to a mentioned state if successfull
                $state.go('candidate.login');
            };
            // logout ends

            // loading the section of sign in page in different language
            // the function loadLangData() is called from the different language
            // button that display in the navbar
            // loadLangData() is declared as $parent to make it available in child controller
            $scope.$parent.loadLangData = function(lang) {
                // datagenerate is a service that call the API to get the json data
                // datagenerate defined in -->> applayout/services/languagechange.js
                datagenerate.getjson('section', lang).then(function(result) {
                    if (result !== 'err') {
                        $scope.$parent.resourceData = result;
                    } else {
                        // handling the error and by default assigning the English language
                        $scope.loadLangData('English');

                        /* After loading default lang English flash message is displayed that
                        language is not supported */
                        let message = 'Sorry ! Language not yet supported';
                        Flash.create('danger', message);
                    }
                });

                // for getting the header or title of project i.e "SAMARTH" in different languages
                datagenerate.getjson('nav', lang).then(function(result) {
                    $scope.title = result.header;
                });
            };
            // on loading navctrl, calling loadLangData() function with default English language
            $scope.loadLangData('English');

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');
        }
    ]);
