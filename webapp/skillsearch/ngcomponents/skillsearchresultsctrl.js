angular.module('sm-skillprofile') 
    .component('mySearchskillcard',{            
    templateUrl: 'skillsearch/templates/searchresult.html',
              controller: skillsearchctrl,
    bindings: {
        results: "="
    }          
}); 

function skillsearchctrl()            {                
    var ctrl = this;
    console.log("From Skill card: ", ctrl.hero); 
    this.exp = function(x) {                  
        if (x == "1") {
            return ctrl.experienceColor = "black";
        }                  
        if (x == "2") {
            return ctrl.experienceColor = "red";
        }                  
        if (x == "3") {
            return ctrl.experienceColor = "orange";
        }                  
        if (x == "4") {
            return ctrl.experienceColor = "yellow";
        }                  
        if (x == "5") {
            return ctrl.experienceColor = "green";
        }              
    }
}
  
