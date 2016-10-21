 angular.module("sm-candidateprofile")

 .controller('navCtrl', ['$scope', 'datagenerate', function($scope, datagenerate) {


     //this function is used to get the data from resources.json file in language object
     $scope.loadnavlang = function() {

         datagenerate.getjson("nav", "language").then(function(result) {
             // console.log(JSON.stringify(result));    
             console.log("result inside datagenerate", result[0]);
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
     $scope.loadnavlang();
 }]);
