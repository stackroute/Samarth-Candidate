var app = angular.module('sm-skillprofile').component("mySearch", {
    templateUrl: "/skillsearch/templates/skillsearch.html",
    controller: myskillsearchctrl
});

function myskillsearchctrl($http) {
    var ctrl = this;
    ctrl.find = '';
    ctrl.message = {};
    this.search = function() {

        $http({
                method: 'GET',
                url: 'http://localhost:8082/profiles?q=' + ctrl.find,
                dataType: 'json'
            })
            .then(function success(response) {
                ctrl.message = response.data;
                console.log("Got search result: ", ctrl.message);
            });
    }
};

