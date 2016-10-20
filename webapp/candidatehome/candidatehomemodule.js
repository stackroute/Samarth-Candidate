/* sm-candidateprofile Module is in root folder in smcandidateprofile.js */

angular.module("sm-candidateprofile")
    .service('SatellizerInterceptor', Interceptor) // injecting the satellizer interceptor into module
    .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {

        /* skipIfLoggedIn() function redirects user to a particular page based on its authentication status i.e if user is logged in he will be automatically redirected to a defined state in this case it is "/dashboard" and hence skipping the view where it is called */
        var skipIfLoggedIn = ['$q', '$auth', '$location', function($q, $auth, $location) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                console.log('from inside helper');
                $location.path('/dashboard');
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];
        //skipIfLoggedIn ends


        /* loginRequired() function redirects user to login page based on its authentication status i.e if user is not logged in he will be automatically redirected to login state wherever he may be , in this case it is the view where this function is called . */
        var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }];
        //loginRequired ends


        // Url routing starts here
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    "content": {
                        templateUrl: '/candidatelogin/templates/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'login',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn /*passing skipIfLoggedIn function here enables skipping login view if the user is already authenticated*/
                        }

                    }
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    "content": {
                        templateUrl: 'registercandidate/templates/register.html',
                        controller: 'RegisterCtrl as register',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn /*passing skipIfLoggedIn function here enables skipping login view if the user is already authenticated*/
                        }
                    }
                }
            })
            .state('dashboard', {
                url: '/dashboard',

                views: {
                    "content": {
                        templateUrl: 'candidatehome/templates/dashboard.html',
                        controller: 'DashboardCtrl',
                        controllerAs: 'dashboard',
                        resolve: {
                            loginRequired: loginRequired /*passing loginRequired function here enables redirecting user to the login view if the user is not authenticated . This will prevent user form accessing this state*/
                        }
                    }
                }
            });

        // redirects to login page if user request a non-existing state
        $urlRouterProvider.otherwise('/login');


        /* Satellizer properties override needed for customization*/
        $authProvider.loginUrl = 'http://localhost:8080/signin'; /*required login api endpoint*/
        $authProvider.signupUrl = 'http://localhost:8000/api/v1/auth/register'; /*required register api endpoint*/
        $authProvider.tokenPrefix = 'satellizer'; /*local storage name prefix "satellizer_YOUR-TOKEN-NAME"*/
        $authProvider.tokenHeader = 'x-user-access-token'; /*token header that needs to be injected in every request via interceptor*/
        $authProvider.tokenType = ''; /* default -> "Bearer" reset to blank required*/
        $authProvider.httpInterceptor = false; /* Turn off default interceptor provided by satellizer*/


        return new HttpProviderConfig($httpProvider);
    });



/*Overridden Interceptor of Satellizer for intercepting and authentication every request

===================DO NOT CHANGE Unless Required =========================================

*/
var Interceptor = (function() {
    function Interceptor(SatellizerConfig, SatellizerShared, SatellizerStorage, $q) {

        var _this = this;
        this.SatellizerConfig = SatellizerConfig;
        this.SatellizerShared = SatellizerShared;
        this.SatellizerStorage = SatellizerStorage;

        /* request interceptor method  */
        this.request = function(config) {
            if (config['skipAuthorization']) {
                return config;
            }

            if (_this.SatellizerShared.isAuthenticated()) {
                var tokenName = _this.SatellizerConfig.tokenPrefix ? [_this.SatellizerConfig.tokenPrefix, _this.SatellizerConfig.tokenName].join('_') : _this.SatellizerConfig.tokenName;
                var token = _this.SatellizerStorage.get(tokenName);
                if (_this.SatellizerConfig.tokenHeader && _this.SatellizerConfig.tokenType) {
                    token = _this.SatellizerConfig.tokenType + ' ' + token;
                }

                /*Inclusion of all required tokens in the header
                Any custom header can be included by using config.headers here*/
                config.headers[_this.SatellizerConfig.tokenHeader] = token;
                config.headers['x-access-token'] = _this.SatellizerShared.getPayload()['sm-token'];

            }
            return config;
        }; //request end

        /*responseError handler of the interceptor*/
        this.responseError = function(rejection) {

                if (rejection.status === 401 || rejection.status === 403) {
                    $rootScope.$emit("member-unauthorized");
                }

                return $q.reject(rejection);
            } // response end

    } //Interceptor function ends

    Interceptor.Factory = function(SatellizerConfig, SatellizerShared, SatellizerStorage, $q) {
        return new Interceptor(SatellizerConfig, SatellizerShared, SatellizerStorage, $q);
    };
    Interceptor.$inject = ['SatellizerConfig', 'SatellizerShared', 'SatellizerStorage', '$q'];
    return Interceptor;

}()); // Interceptor declaration change


// Injecting all the required dependencies into the interceptor declared above
Interceptor.Factory.$inject = ['SatellizerConfig', 'SatellizerShared', 'SatellizerStorage', '$q'];

//Pushing the interceptor into $httpProvider
var HttpProviderConfig = (function() {
    function HttpProviderConfig($httpProvider) {
        this.$httpProvider = $httpProvider;
        $httpProvider.interceptors.push(Interceptor.Factory);
    }
    HttpProviderConfig.$inject = ['$httpProvider'];
    return HttpProviderConfig;
}());
//HttpProviderConfig ends
