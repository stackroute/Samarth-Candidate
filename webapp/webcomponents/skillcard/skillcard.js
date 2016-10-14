angular.module('sm-skillprofile')        .component('mySkillcard',          {            
    templateUrl: 'webcomponents/skillcard/templates/skillcard.html',
                controller: skillcardctrl,
    bindings: {
        // data: "="
    },
    transclude: true             
});

function skillcardctrl($window, $timeout, $mdDialog, skillcardservice)            {
    var ctrl = this;
    var name;
    console.log("Inside skill card ctrl....");
    skillcardservice.getskillcarddata().then(function(result) {
        ctrl.data = result;
    });






    function createDownloadUrl() {

        name = ctrl.data.name + ".png";
        ctrl.data1 = ctrl.data;            
        ctrl.downloaddata = JSON.stringify(ctrl.data1);

        blob = new Blob([ctrl.downloaddata], { type: 'text/plain' }),
            url = $window.URL || $window.webkitURL;
        ctrl.fileUrl = url.createObjectURL(blob);
    }
    var getCanvas;
    $timeout(createDownloadUrl, 1000);


    ctrl.render = function(ev) {
        var card = angular.element(document.querySelector('#totalcardarea'));
        html2canvas(card, {
            onrendered: function(canvas) {

                getCanvas = canvas;
                ctrl.downloadcard();
                // ctrl.showConfirm(ev);     
            }
        });


    }  

    ctrl.downloadcard = function() {
        var imgageData = getCanvas.toDataURL("image/png");
        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
        //window.location.href = newData;
        //window.open(newData,name)
        var dwld = angular.element(document.querySelector('#download'));
        dwld.attr("download", name).attr("href", newData)    
    }

}        

           
