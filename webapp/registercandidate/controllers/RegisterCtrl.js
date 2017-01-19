/* RegisterCtrl controller -> responsible for authentication and having $state,
$auth as dependencies*/
angular.module('sm-candidateprofile')
.controller('RegisterCtrl', [
    '$auth',
    '$state',
    'Flash',
    'professionService',
    'locationFacto',
    function($auth,
        $state,
        Flash,
        professionService,
        locationFacto) {
        let vm = this;
        vm.location = [];
        vm.centerProfession = [];
        vm.user = {};


        professionService.profession()
        .then(function success(response) {
                    //console.log(response);
                    vm.professions = response.data;
                }, function error(error) {
                    console.log("Error on inserting data");
                });

        function locationsFac()
        {
            locationFacto.locationReq().then(function(data) 
            {
              console.log('location--------------');
              console.log(data);
              var temp=[];
              for( var i=0;i<data.data.length;i++)
              {    
                  temp[i]= data.data[i].location;
              }
              vm.location= temp;
              console.log(vm.location);
          })
        }
        vm.locationsFac = locationsFac;
        vm.locationsFac();


        // function getCenterProfession(){
        //   placementCenter.getCenterName().then(function(result) {
        //     vm.centerProfession=result;
        // },function(err){
        //     console.log(err);
        // });  
        // }
        // vm.getCenterProfession = getCenterProfession;
        // vm.getCenterProfession();

            /* Login() function which will be actually called in the associated view for
            registering the user*/
            vm.register = function __register() {
                /* $auth.signup() is a predefined function provided by satellizer for
                initiating registration
                of the user . This returns a promise and accepts an object with all the
                required fields which
                needs to be sent to the api for registration

                NOTE :- To change the registration api endpoint/URI , please override
                $authProvider.signupUrl with new
                value in /auth/authmodule.js */
                $auth.signup({

                    name: vm.user.name,
                    adharcard: vm.user.adharcard,
                    mobile: vm.user.number,
                    email: vm.user.email,
                    location: vm.user.location,
                    pwd: vm.user.password,
                    profession: vm.user.profession

                }).then(function() {
                    let message = 'Successfully completed registration..!';
                    Flash.create('success', message);
                    // redirects to a mentioned state if successfull
                    $state.go('candidate.login');
                }).catch(function() {
                    let message = 'Some Error ! Please Try Again';
                    Flash.create('danger', message);
                });
                // $auth.signup ends
            };
        }
        ]);
