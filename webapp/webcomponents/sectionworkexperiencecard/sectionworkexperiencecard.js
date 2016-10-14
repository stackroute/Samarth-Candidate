var app = angular
    .module('sm-skillprofile')
    .component('myWorkexperiencecard', {
        templateUrl: '/webcomponents/sectionworkexperiencecard/templates/sectionworkexperiencecard.html',
        controller: workexperienceCardController

    })
    /*app.filter('capitalize', function() {
        return function(input, scope) {
            if (input != null)
                input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
    });
    */
    .directive('formattedDate1', function(dateFilter) {
        return {
            require: 'ngModel',
            scope: {
                format: "="
            },
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    //convert data from view format to model format
                    return dateFilter(data, scope.format); //converted
                });

                ngModelController.$formatters.push(function(data) {
                    //convert data from model format to view format
                    return dateFilter(data, scope.format); //converted
                });
            }
        }
    })

function workexperienceCardController($http, $mdDialog, UserAuthService, datagenerate, localStorageService, $rootScope) {
    var ctrl = this;
    ctrl.loadLangData = function(lang) {
        datagenerate.getjson("section", lang).then(function(result) {
            ctrl.items = result;

        }); //end datagenerate
    }


    ctrl.loadLangData(getItem("lang"));

    function getItem(key) {
        return localStorageService.get(key);
    }
    //$scope.loadLangData("Hindi");
    $rootScope.$on("lang_changed", function(event, data) {

        ctrl.loadLangData(data.language);
    });
    var candidateid = UserAuthService.getUser().uname;
    ctrl.workexperiences = [];
    ctrl.workexperience1 = [];
    ctrl.totalworkexperience = 0;
    ctrl.limitval = 2;
    ctrl.increaseLimit = function() {

        ctrl.limitval = ctrl.totalworkexperience;
    }

    ctrl.decreaseLimit = function() {
        ctrl.limitval = 2;
    }

    $http.get('http://localhost:8081/work/' + candidateid)
        .then(function success(response) {
            for (var noofobj = 0; noofobj < response.data.length; noofobj++) {
                for (var record = 0; record < response.data[noofobj].workexperience.length; record++) {
                    ctrl.workexperiences.push(response.data[noofobj].workexperience[record]);
                }
                ctrl.totalworkexperience = ctrl.workexperiences.length;
                // console.log("total", ctrl.totalworkexperience);

            }
            //console.log("total",totalworkexperience);
        }, function error(response) {
            console.log("error occored");
        });
    $rootScope.$on("workexpdata", function() {
        ctrl.workexperiences = [];
        ctrl.totalworkexperience = 0;
        $http.get('http://localhost:8081/work/' + candidateid)
            .then(function success(response) {
                for (var noofobj = 0; noofobj < response.data.length; noofobj++) {
                    for (var record = 0; record < response.data[noofobj].workexperience.length; record++) {
                        ctrl.workexperiences.push(response.data[noofobj].workexperience[record]);
                    }
                    ctrl.totalworkexperience = ctrl.workexperiences.length;
                    // console.log("total", ctrl.totalworkexperience);

                }
                //console.log("total",totalworkexperience);
            }, function error(response) {
                console.log("error occored");
            });

    })

    ctrl.showAdvanced = function($event, header, object) {

        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/webcomponents/sectionworkexperiencecard/templates/sectionworkexperienceconversation.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                locals: {
                    header: header,
                    object: object
                }
            })
            .then(
                function(answer) {},
                function() {}
            );
    };


    function DialogController($scope, $mdDialog, $http, header, object, UserAuthService) {
        var candidateid = UserAuthService.getUser().uname;

        $scope.header = header;
        $scope.projectObj = object;
        if (object != '') {
            $scope.designation = object.designation;
            $scope.workplace = object.workplace;
            $scope.Location = object.Location;
            $scope.year = object.duration.duration;
            $scope.from = object.duration.from;
            $scope.to = object.duration.to;

            /*var str=object.skills;

            console.log(str);
            $scope.skill = object.skills[0].split(",");
            console.log($scope.skill);*/
            $scope.skills = object.skills;
        } else {
            $scope.designation = "";
            $scope.workplace = "";
            $scope.Location = "";
            $scope.workplace = "";
            $scope.year = "";
            $scope.from = "";
            $scope.to = "";
            $scope.skill = "";


        }
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };


        $scope.save = function(header) {

            console.log("Header" + header);
            var skills1 = $scope.skills;
            var res = skills1.toString().split(",");
            console.log("splits", res);
            console.log("length", res.length);

            var workdata = {


                "workexperience": [{

                    "designation": $scope.designation,
                    "workplace": $scope.workplace,
                    "Location": $scope.Location,
                    "duration": {
                        "duration": $scope.year,
                        "from": $scope.from,
                        "to": $scope.to
                    },

                    "skills": res
                        // var str=$scope.skill
                        //"skills":$scope.skills
                }]

            }
            if (header == "Add Workexperience") {
                console.log("Inside work adding...")
                $http({
                    method: 'POST',
                    url: 'http://localhost:8081/work/' + candidateid,
                    data: workdata,
                    crossDomain: true
                }).then(function successCallback(response) {
                    console.log("After adding workexperience", response.data)
                    $rootScope.$emit("workexpdata", {});
                }, function errorCallback(response) {
                    console.log('Error accord during at post Section')
                });  
            } else {
                console.log("data after saving", workdata);
                $http({
                    method: 'PATCH',
                    url: 'http://localhost:8081/work/' + candidateid + '/' + object.workplace,
                    data: workdata,
                    crossDomain: true
                }).then(function successCallback(response) {
                    $rootScope.$emit("workexpdata", {});
                    console.log("After updating ", response.data)

                }, function errorCallback(response) {
                    console.log('Error accord during updating experience Section')
                });  

            }
        }
    }
}
