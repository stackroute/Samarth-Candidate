angular.module('sm-skillprofile')
    .service('skillcardservice', function($http, $filter, $rootScope, localStorageService, UserAuthService) {
        return {
            getskillcarddata: function() {
                var skillcarddata = {};
                var candidateid = UserAuthService.getUser().uname;
                return $http({ 
                    method: "get",
                    url: "http://localhost:8081/skillcard/" + candidateid,

                }).then(function mySucces(response)  { 

                    var object = response.data.result;

                    if (object.personalinfo[0].name != undefined) {
                        skillcarddata['name'] = object.personalinfo[0].name;
                        localStorageService.set('User', object.personalinfo[0].name);
                    }
                    if (object.personalinfo[0].dob != undefined) {
                        skillcarddata['dob'] = $filter('date')(object.personalinfo[0].dob, "dd/MMM/yyyy");
                        skillcarddata['age'] = (new Date()).getFullYear() - $filter('date')(object.personalinfo[0].dob, "yyyy");
                    }
                    if (object.personalinfo[0].gender != undefined) {
                        skillcarddata['gender'] = object.personalinfo[0].gender;
                    }
                    if (object.personalinfo[0].maritialstatus != undefined) {
                        skillcarddata['maritalstatus'] = object.personalinfo[0].maritialstatus;
                    }
                    if (object.personalinfo[0].contact != undefined) {
                        skillcarddata['contact'] = object.personalinfo[0].contact;
                    }
                    if (object.personalinfo[0].email != undefined) {
                        skillcarddata['email'] = object.personalinfo[0].email;
                    }
                    if (object.workexp[0].workexperience.length > 0) {
                        skillcarddata['location'] = object.workexp[0].workexperience[0].Location;
                    }
                    if (object.workexp[0].workexperience.length > 0) {
                        skillcarddata['designation'] = object.workexp[0].workexperience[0].designation;
                    }
                    // if (object.skill[0].skills.length > 0) {
                    //     skillcarddata['skills'] = [(object.skill[0].skills[0].skillname)];
                    // }
                    if (object.skill[0].skills.length > 0) {
                        skillcarddata['skills'] = [(object.skill[0].skills)];
                    }

                    // skillcarddata['name']=object.personalinfo[0].name;
                    console.log(skillcarddata['skills'], "skills in sc");
                    console.log('SKILL CARD SERVICE', skillcarddata);
                    return skillcarddata;
                }, function myError(response) { 
                    console.log("error in getting skillcard details"); 
                });
            }

        };
    });
