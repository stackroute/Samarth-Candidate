var myApp = angular.module("sm-skillprofile", ['ngMaterial',
        'ngAnimate',
        'ngMessages',
        'ui.router',
        'LocalStorageModule'
    ])
  .config(['$urlMatcherFactoryProvider',
        function($urlMatcherFactoryProvider) {
      $urlMatcherFactoryProvider.caseInsensitive(true);
        }
    ])
  .config(function($mdThemingProvider) {
    var customPrimary = {
      '50': '#bef5ff',
      '100': '#72e9ff',
      '200': '#3ae0ff',
      '300': '#00ccf1',
      '400': '#00b2d3',
      '500': '#0098b4',
      '600': '#007e95',
      '700': '#006477',
      '800': '#004a58',
      '900': '#00313a',
      'A100': '#bef5ff',
      'A200': '#72e9ff',
      'A400': '#00b2d3',
      'A700': '#006477',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
    };

    $mdThemingProvider.definePalette('customPrimary',
      customPrimary);

    var customBackground = {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#ffffff',
      '600': '#f0f0f0',
      '700': '#e0e0e0',
      '800': '#d1d1d1',
      '900': '#c2c2c2',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#e0e0e0',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700'
    };
    $mdThemingProvider.definePalette('customBackground',
      customBackground);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .backgroundPalette('customBackground')
  });