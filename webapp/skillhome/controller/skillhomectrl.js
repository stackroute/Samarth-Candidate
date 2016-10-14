angular.module('sm-skillprofile')
    .controller('skillhomectrl', ['$scope', '$http', '$rootScope', 'datagenerate', '$location', '$anchorScroll',
        'localStorageService',

        function($scope, $http, $rootScope, datagenerate, $location, $anchorScroll, localStorageService) {
            $rootScope.showSignout = true;
            $scope.carddata = {};
            $scope.scrollTo = function(elementId) {
                $location.hash(elementId);
                $anchorScroll();
            }
            $rootScope.$emit("callparent", {});



        }
    ]);
