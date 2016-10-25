/* sm-candidateprofile Module is in root folder in smcandidateprofile.js */
angular.module("sm-candidateprofile")
    .service('SatellizerInterceptor', Interceptor) // injecting the satellizer interceptor into module
    .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {

        /* Satellizer properties override needed for customization*/
        $authProvider.loginUrl = '/signin'; /*required login api endpoint*/
        $authProvider.signupUrl = '/signup'; /*required register api endpoint*/
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
    function Interceptor(SatellizerConfig, SatellizerShared, SatellizerStorage, $q , $rootScope) {

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
                    //console.log('signin failed from interceptor handler');
                }

                return $q.reject(rejection);
            } // response end

    } //Interceptor function ends

    Interceptor.Factory = function(SatellizerConfig, SatellizerShared, SatellizerStorage, $q , $rootScope) {
        return new Interceptor(SatellizerConfig, SatellizerShared, SatellizerStorage, $q , $rootScope);
    };
    Interceptor.$inject = ['SatellizerConfig', 'SatellizerShared', 'SatellizerStorage', '$q' , '$rootScope'];
    return Interceptor;

}()); // Interceptor declaration change


// Injecting all the required dependencies into the interceptor declared above
Interceptor.Factory.$inject = ['SatellizerConfig', 'SatellizerShared', 'SatellizerStorage', '$q' , '$rootScope'];

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
