/* sm-candidateprofile Module is in root folder in smcandidateprofile.js */
angular.module("sm-candidateprofile")
    .config(function($stateProvider, $urlRouterProvider, $authProvider) {
        console.log('inside appconfig');
        // Url routing starts here
        $stateProvider
            .state('candidate', {
                url: '/home',
                views: {
                    "content@": {
                        templateUrl: '/applayout/templates/content.html'
                    },
                    "navbar": {
                        templateUrl: '/applayout/templates/navbar.html',
                        controller:'navCtrl'

                    },
                    "footer": {
                        templateUrl: '/applayout/templates/footer.html'
                    }
                }
            });


        // redirects to login page if user request a non-existing state
        $urlRouterProvider.otherwise('/home/login');
    });

/* NOTE :- home state child  routes are in candidatehome/candidatehomemodules.js*/