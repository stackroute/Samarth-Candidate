angular.module('sm-skillprofile')
    .component('myPersonalinfocard', {
        templateUrl: '/webcomponents/sectionpersonalinfocard/templates/sectionpersonalinfocard.html',
        controller: personalinfoCardController
    }).directive('formattedDate', function(dateFilter) {
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
    .filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });



function personalinfoCardController($http, $mdDialog, $rootScope, localStorageService, UserAuthService, datagenerate) {
    var ctrl = this;
    ctrl.personalInfo = {};
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

    $http({
        method: "GET",
        url: 'http://localhost:8081/personalinfo/' + candidateid
    }).then(function successCallback(response) {

        ctrl.personalInfo = response.data[0];

    }, function errorCallback(response) {
        console.log('Error in personal info');
    }); 
    ctrl.value = false;
    ctrl.value1 = true; 

    ctrl.toggle = function() {

        ctrl.value = !(ctrl.value) ? true : false;
        ctrl.value1 = !(ctrl.value1) ? true : false;
        console.log('toggle', ctrl.value);

    };

    ctrl.status = '  ';
    ctrl.customFullscreen = false;
    ctrl.showAdvanced = function(ev, personalInfo, title) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/webcomponents/sectionpersonalinfocard/templates/sectionpersonalinfoconversation.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    val: personalInfo,
                    header: title
                },
                fullscreen: ctrl.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                ctrl.status = 'You said the information was "' + answer + '".';
            }, function() {
                ctrl.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog, val, header) {
        $scope.personalObject = val;
        var candidateid = UserAuthService.getUser().uname;

        $scope.header = header;
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.save = function(personalinfoObject, header) {


            var personalinfoObj = {
                "personalInfo": {
                    "name": personalinfoObject.name,
                    "dob": personalinfoObject.dob,
                    "gender": personalinfoObject.gender,
                    "maritialstatus": personalinfoObject.maritialstatus,
                    "location": personalinfoObject.location,
                    "mothertongue": personalinfoObject.mothertongue,
                    "email": personalinfoObject.email,
                    "contact": personalinfoObject.contact,
                    "address": personalinfoObject.address,
                    "pincode": personalinfoObject.pincode
                }
            };

            if (header === "Edit Info") {
                $http({ 
                    method: "POST",
                    url: "http://localhost:8081/personalinfo/" + candidateid,
                    data: personalinfoObj

                }).then(function mySucces(response)  { 
                    //console.log("res inn pi", response)

                }, function myError(response) { 
                    console.log(response); 
                });
            }
            $mdDialog.hide();
        };
    }
}
