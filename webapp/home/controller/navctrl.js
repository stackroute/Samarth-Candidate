 angular.module("sm-skillprofile")
     .controller('navCtrl', ['$scope', '$http', '$state', '$mdSidenav',
         '$rootScope', 'datagenerate', 'localStorageService', 'UserAuthService', '$timeout',

         function($scope, $http, $state, $mdSidenav, $rootScope, datagenerate,
             localStorageService, UserAuthService, $timeout) {
             $rootScope.showSignout = false;
             // $scope.signout = function() {

             //     localStorageService.remove('JWT');

             //     $http.defaults.headers.common.Authorization = '';

             //     if (localStorageService.get('JWT') == null) {
             //         $state.go('skillprofile.signin');

             //     }
             // }
             $rootScope.$on("callparentmethod", function() {
                 if (UserAuthService.getUser() == undefined) {
                     console.log(" hide nav bar ", UserAuthService.getUser());
                     $scope.displaysidenav = false;
                 } else {
                     console.log("show nav bar ", UserAuthService.getUser());

                     $scope.displaysidenav = true;
                 }
             })
             $rootScope.$on("callparent", function() {
                 if (UserAuthService.getUser() == undefined) {
                     console.log(" hide nav bar ", UserAuthService.getUser());
                     $scope.displaysidenav = false;
                 } else {
                     console.log("show nav bar ", UserAuthService.getUser());
                     $scope.displaysidenav = true;
                 }
             })

             $scope.select = function(index) {
                 $scope.selected = index;
                 console.log($scope.selected);
             };


             $scope.jqueryScrollbarOptions = {
                 "onScroll": function(y, x) {
                     if (y.scroll == y.maxScroll) {
                         alert('Scrolled to bottom');
                         console.log("hi");
                     }
                 }
             };
             if (UserAuthService.getUser() == undefined) {
                 console.log(" hide nav bar ", UserAuthService.getUser());
                 $scope.displaysidenav = false;
             } else {
                 console.log("show nav bar ", UserAuthService.getUser());
                 $scope.displaysidenav = true;
             }

             // $timeout($scope.Onlogout = function() {
             //         if (UserAuthService.getUser() == undefined) {
             //             console.log(" hide nav bar ", UserAuthService.getUser());
             //             $scope.displaysidenav = false;
             //         } else {
             //             console.log("show nav bar ", UserAuthService.getUser());
             //             $scope.displaysidenav = true;
             //         }
             //     }, 3000)
             //Get the current logged in user
             console.log("get user", UserAuthService.getUser())



             $scope.togglemenu = buildToggler('left');

             function buildToggler(navID) {
                 return function() {
                     $mdSidenav(navID)
                         .toggle()
                         .then(function() {});
                 }
             }

             $scope.selectlang = "English";
             $scope.language = ['English', 'Hindi', 'Telugu', 'Tamil', 'Punjabi', 'Marathi', 'Bengali', 'Urdu', 'Odiya', 'Gujrati'];
             $scope.onChange = function() {
                 console.log($scope.selectlang);
                 //$scope.loadLangData($scope.selectlang);
                 if ($scope.selectlang != 'English' && $scope.selectlang != 'Hindi') {
                     $scope.selectlang = 'English';
                 }
                 submit("lang", $scope.selectlang)

                 function submit(key, val) {
                     return localStorageService.set(key, val);
                 }
                 $rootScope.$emit("lang_changed", {
                     language: $scope.selectlang
                 })
             };
             // $scope.onChange();

             $scope.loadLangData = function(lang) {
                     submit("lang", lang);

                     function submit(key, val) {
                         return localStorageService.set(key, val);
                     }

                     datagenerate.getjson("nav", lang).then(function(result) {
                         // console.log(JSON.stringify(result));
                         $scope.title = result.header;
                         console.log("inside card1");
                         console.log(result.header);

                     }); //end datagenerate
                 }
                 // $rootScope.$emit("lang_changed", { language: "English" })
             $scope.loadLangData($scope.selectlang);

             $rootScope.$on("lang_changed", function(event, data) {
                 console.log("User switch to language ", data.language);
                 $scope.loadLangData(data.language);

             });
             console.log("registring navctrl");
         }
     ]);
