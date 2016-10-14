angular.module('sm-skillprofile')
    .factory('sectionskillcard', function($http, $rootScope, localStorageService, UserAuthService) {
        return {
            getjson: function() {
                var skill = {};
                var candidateid = UserAuthService.getUser().uname;

                return $http({ 
                    method: "get",
                    url: "http://localhost:8081/skill/" + candidateid,

                }).then(function mySucces(response)  { 
                    // console.log("res",response.data[0])
                    for (var prop in response.data[0])  { 
                        if (prop == "skills")  { 

                            skill[prop] = response.data[0][prop]; 
                        }

                    }
                    //console.log("skill",skill);
                     
                    return skill;

                }, function myError(response) { 
                    console.log('error in getting sectionskill'); 
                });
            }

        };
    });
