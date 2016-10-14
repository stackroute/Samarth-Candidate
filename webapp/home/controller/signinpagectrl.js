angular.module("sm-skillprofile")
     .controller('signinpageCtrl',['$scope','$rootScope','datagenerate',function($scope,$rootScope,datagenerate){

             $scope.loadLangData = function(lang) {
                 datagenerate.getjson("section", lang).then(function(result) {
                      console.log(result);
                     $scope.signin = result.signin;
                     console.log("result",result.signin);
                     

                 }); //end datagenerate
             }
             
             $scope.loadLangData("English");

             $rootScope.$on("lang_changed", function(event, data) {
                 console.log("User switch to language ", data.language);
                 $scope.loadLangData(data.language);

             });
     }]);