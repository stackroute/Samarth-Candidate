angular
    .module('sidenavDemo2', ['ngMaterial'])
    .controller('navCtrl', [
        '$scope',
        '$mdSidenav',
        function($scope,
            $mdSidenav) {


            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');
        }
    ]);
