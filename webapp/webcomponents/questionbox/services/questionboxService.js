angular.module('sm-skillprofile')
    .service('quesnboxService', function($http, $rootScope, localStorageService, UserAuthService) {
        var candidateid = UserAuthService.getUser().uname;
        var candidateid = 7204487502;

        return {
            questionGenerator: function(lang) {

                var sectionArray = [
                    'project',
                    'skills',
                    'qualification'


                ];
                var randomNumber = Math.floor(Math.random() * sectionArray.length);
                console.log("Section array....", sectionArray[randomNumber])
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/candidates/' + candidateid + '/qboxquestions?sections=' + sectionArray[randomNumber] + '&limit=2&skip=0&lang=' + lang
                }).then(function successCallback(response) {
                    var questionObj = response.data;
                    console.log("About to save questionObj", questionObj);
                    return questionObj;
                }, function errorCallback(response) {
                    console.log('Error accord during Project Section')
                    return;
                });  

            },
            updatequestion: function(questiondata, answer) {
                return $http({
                    method: 'PATCH',
                    url: 'http://localhost:8081/candidates/' + candidateid + '/' + answer,
                    data: questiondata
                }).then(function successCallback(response) {

                    console.log("About to update answer");
                    return response;
                }, function errorCallback(response) {
                    console.log('Error accord during Project Section')
                    return;
                });  
            }
        };

    });
