let myApp = angular.module('sm-candidateprofile', ['ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ngMdIcons',
    'LocalStorageModule',
    'ngFlash',
    'ngFileUpload',
    'samarth-webcomponents',
    'simplePagination',
    'satellizer',
    'ngStorage',
    'ui.router',
    'mm.acl',
    'samarth.accessdenied'
    ])
.config(['$mdThemingProvider', function($mdThemingProvider) {
    let customPrimary = {
        50: '#00d1f8',
        100: '#00c3e7',
        200: '#00b5d6',
        300: '#00a6c5',
        400: '#0098b4',
        500: '#008aa3',
        600: '#007b92',
        700: '#006d81',
        800: '#005f70',
        900: '#00505f',
        A100: '#00424e',
        A200: '#00343d',
        A400: '#00252c',
        A700: '#00171b',
        contrastDefaultColor: 'light',
        contrastDarkColors: '50 100 200 300 400 A100 A200 A400'
    };

    $mdThemingProvider.definePalette('customPrimary',
        customPrimary);

    let customBackground = {
        50: '#ffffff',
        100: '#ffffff',
        200: '#ffffff',
        300: '#ffffff',
        400: '#ffffff',
        500: '#ffffff',
        600: '#f0f0f0',
        700: '#e0e0e0',
        800: '#d1d1d1',
        900: '#c2c2c2',
        A100: '#ffffff',
        A200: '#ffffff',
        A400: '#ffffff',
        A700: '#e0e0e0',
        contrastDefaultColor: 'light',
        contrastDarkColors: '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700'
    };
    $mdThemingProvider.definePalette('customBackground',customBackground);

    $mdThemingProvider.theme('default')
        // .primaryPalette('indigo')
        .primaryPalette('customPrimary')
        // .backgroundPalette('customBackground');
}])
.config(['$locationProvider', function($locationProvider) {
 $locationProvider.hashPrefix('');
}])
 .config(function($compileProvider) {
 $compileProvider.preAssignBindingsEnabled(true);
})
 .run(function($http, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.tokenDetails) {
            $http.defaults.headers.common['x-access-token'] = $localStorage.tokenDetails.token;
        }
 })
 .run(['$rootScope', '$state', '$auth', '$http','$localStorage', 'AclService', function ($rootScope, $state, $auth, $http, $localStorage, AclService) {

   var aclData = {
     guest :['candidate.login','candidate.register','candidate.accessdenied'],

     candidate: ['candidate.login','candidate.dashboard', 'candidate.jobSearch','candidate.jobSearch.results',
                  'candidate.appliedJob','candidate.jobPost','index.appliedJob']
   }
   AclService.setAbilities(aclData);

   $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){
     if ($auth.isAuthenticated()) {
     AclService.attachRole($auth.getPayload().role);
     }
     else {
       AclService.attachRole('guest');
     }

 if(!AclService.can(toState.name)){
   $rootScope.sideicon = false;
   $rootScope.logout = false;
   AclService.flushRoles();
   AclService.attachRole('guest');
   $auth.removeToken();
   $http.defaults.headers.common['x-access-token']='';
   delete $localStorage.tokenDetails;
     e.preventDefault();
     $state.transitionTo('candidate.accessdenied');
     }
 })
 }]);
