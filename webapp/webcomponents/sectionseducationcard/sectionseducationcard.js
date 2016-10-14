var app = angular
    .module('sm-skillprofile')
    .component('myEducationcard', {
        templateUrl: '/webcomponents/sectionseducationcard/templates/sectionseducationcard.html',
        controller: educationCardController

    });

function educationCardController($mdDialog, $http, datagenerate, $rootScope, localStorageService, UserAuthService) {
    var ctrl = this;
    var candidateid = UserAuthService.getUser().uname;
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

    ctrl.eduDetails = [];
    ctrl.schools = [];
    ctrl.colleges = [];
    $http.get('http://localhost:8081/education/' + candidateid).then(function(response) {

        for (var noOfObjects = 0; noOfObjects < response.data[0].qualification.length; noOfObjects++) {
            for (var record = 0; record < 1; record++) {

                ctrl.eduDetails.push(response.data[0].qualification[noOfObjects]);
            }
        }


        for (var i = 0; i < ctrl.eduDetails.length; i++) {
            if (ctrl.eduDetails[i].institute.type == "school") {
                ctrl.schools.push(ctrl.eduDetails[i]);
            }
            if (ctrl.eduDetails[i].institute.type == "college" || ctrl.eduDetails[i].institute.type == "other" || ctrl.eduDetails[i].institute.type == "work") {
                ctrl.eduDetails[i].institute.type = "work";
                ctrl.colleges.push(ctrl.eduDetails[i]);
            }
        }

    });

    $rootScope.$on("datachanged", function() {
        ctrl.eduDetails = [];
        ctrl.schools = [];
        ctrl.colleges = [];
        console.log("data changed");
        $http.get('http://localhost:8081/education/' + candidateid).then(function(response) {

            for (var noOfObjects = 0; noOfObjects < response.data[0].qualification.length; noOfObjects++) {
                for (var record = 0; record < 1; record++) {

                    ctrl.eduDetails.push(response.data[0].qualification[noOfObjects]);
                }
            }


            for (var i = 0; i < ctrl.eduDetails.length; i++) {
                if (ctrl.eduDetails[i].institute.type == "school") {
                    ctrl.schools.push(ctrl.eduDetails[i]);
                }
                if (ctrl.eduDetails[i].institute.type == "college" || ctrl.eduDetails[i].institute.type == "other" || ctrl.eduDetails[i].institute.type == "work") {
                    ctrl.eduDetails[i].institute.type = "work";
                    ctrl.colleges.push(ctrl.eduDetails[i]);
                }
            }

        });

    })



    ctrl.showAdvanced = function(ev, header, object) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/webcomponents/sectionseducationcard/templates/educonvoNEW.html',
                parent: angular.element(document.body),
                targetEvent: ev,
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

    function DialogController($scope, $mdDialog, $http, header, object, localStorageService, UserAuthService, $rootScope) {
        var candidateid = UserAuthService.getUser().uname;
        $scope.header = header;
        // $scope.yearval="";

        $scope.years = [];
        for (var i = (new Date()).getFullYear(); i >= 1900; i--) {
            $scope.years.push(i);
        }




        if (object != '') {
            $scope.title = object.title;
            $scope.batch = object.batch;
            $scope.result = object.outcome.result;
            $scope.unit = object.outcome.unit;
            $scope.name = object.institute.name;
            $scope.location = object.institute.location;
            $scope.affiliation = object.institute.affiliation;
            $scope.uniqueID = object._id;
            $scope.to = object.to;
            $scope.from = object.from;
            $scope.type = object.institute.type;
            $scope.academicType = object.academicType;
        } else {

            // $scope.title = "course";
            // $scope.batch = "some year";
            // $scope.result = "some value";
            // $scope.unit = " with some unit";
            // $scope.name = "some educational body";
            // $scope.location = "some location";
            // $scope.affiliation = "some controlling body";
            // $scope.to = new Date();
            // $scope.from = new Date();
            // $scope.type = "type of institute";
            // $scope.academicType = "of academic type";
            // $scope.type = ['school', 'college', 'other'];

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
            var education = {
                "qualification": [{
                    "title": $scope.title,
                    "batch": $scope.batch,
                    "from": $scope.to,
                    "to": $scope.from,
                    "academicType": $scope.academicType,
                    "institute": {
                        "name": $scope.name,
                        "type": $scope.type,
                        "location": $scope.location,
                        "affiliation": $scope.affiliation,
                        "metadata": []
                    },
                    "outcome": {
                        "result": $scope.result,
                        "unit": $scope.unit
                    }
                }]
            }

            if (header == ("Add Education")) {
                $http({
                        method: 'POST',
                        url: 'http://localhost:8081/education/' + candidateid,
                        // 'Content-Type':'application/json',
                        data: education
                    })
                    .then(function successCallback(response) {
                            console.log("education added");
                            $rootScope.$emit("datachanged", {});
                            $scope.cancel();

                        },
                        function errorCallback(response) {
                            console.log('error in adding education');
                        });
            }
            if (header == "Edit School" || header == "Edit College") {
                $http({
                        method: 'PATCH',
                        url: 'http://localhost:8081/education/' + candidateid + "/" + $scope.title,
                        // 'Content-Type':'application/json',
                        data: education
                    })
                    .then(function successCallback(response) {
                            console.log('Education Updated');
                            $rootScope.$emit("datachanged", {});
                            $scope.cancel();

                        },
                        function errorCallback(response) {
                            console.log('error in updating education');
                        });
            }

        }
    }


}
