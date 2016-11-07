angular
    .module('sidenavDemo2', ['ngMaterial'])
    .controller('navCtrl', [
        '$mdSidenav',
        '$scope',
        function($mdSidenav,
            $scope) {
            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }
            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');
        }
    ]);
