angular.module('sm-skillprofile')
    .component('myQuestionbox', {            
        templateUrl: 'webcomponents/questionbox/templates/questionbox.html',
        controller: questionBoxCtrl          
    });

function questionBoxCtrl($timeout, quesnboxService, $rootScope, localStorageService, UserAuthService) {
    var candidateid = UserAuthService.getUser().uname
    console.log("data from user", candidateid);
    var ctrl = this;
    ctrl.showMaxBtn = false;
    ctrl.displayAlertMessage = false;
    ctrl.showInputBox = function() {
        ctrl.displayInputBox = false;
    }

    ctrl.hideDisplayAlertMessage = function() {
        ctrl.displayAlertMessage = false;
    }

    ctrl.startInpuBox = function() {
        $timeout(ctrl.showInputBox, 5000);

    }
    ctrl.questionArray = [];
    ctrl.questionobj;
    ctrl.loadquestionarray = function(lang) {
        ctrl.questionArray = [];
        quesnboxService.questionGenerator(lang).then(function(response) {
            ctrl.questionobj = response;
            for (var key = 0; key < response.length; key++) {
                ctrl.questionArray.push(response[key].query);
            }
        });
    }
    ctrl.loadquestionarray(getItem("lang"));

    function getItem(key) {
        return localStorageService.get(key);
    }
    ctrl.tempLang = '';
    $rootScope.$on("lang_changed", function(event, data) {
        console.log("User switch to language " + data.language);
        ctrl.tempLang = data.language;
        ctrl.loadquestionarray(data.language);
    });

    ctrl.answerArray = [];
    ctrl.displayInputBox = true;
    ctrl.displayAnswerdBox = false;
    ctrl.currentQuestionIndex = 0;
    ctrl.nextQuestionIndex = 0;
    ctrl.val = 0;
    ctrl.clear = '';
    noOfObjects = 0;

    ctrl.increaseIndex = function() {
        if (ctrl.clear == '') {
            ctrl.displayAlertMessage = true;
        } else {

            ctrl.displayAlertMessage = false;
            ctrl.currentQuestionIndex = ctrl.currentQuestionIndex + 1;
            ctrl.val = Math.floor((ctrl.currentQuestionIndex / ctrl.questionArray.length) * 100);
            if (ctrl.currentQuestionIndex == ctrl.questionArray.length) {
                $timeout(ctrl.hideQuestionBox, 300);
            }
            ctrl.answerArray.push(ctrl.clear);
            console.log("Inside Answer of Qbox:", ctrl.questionobj);

            quesnboxService.updatequestion(ctrl.questionobj[noOfObjects], ctrl.clear).then(function(response) {
                console.log("Inside update question");
                ctrl.clear = '';
                noOfObjects++;

            });

        }
    }
    ctrl.hideQuestionBox = function() {
        ctrl.displayInputBox = true;
        ctrl.displayAnswerdBox = true;
        $timeout(ctrl.showQuestionBox, 3000);
    }
    ctrl.minimizeQuestionBox = function() {
        ctrl.displayInputBox = true;
        //ctrl.showMaxBtn = true;
        $timeout(ctrl.showQuestionBox, 10000);

    }
    ctrl.showQuestionBox = function() {
        ctrl.loadquestionarray(ctrl.tempLang);
        ctrl.currentQuestionIndex = 0;
        ctrl.val = 0;
        ctrl.displayInputBox = false;
        ctrl.displayAnswerdBox = false;
    }                

}
