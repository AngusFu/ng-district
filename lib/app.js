
angular.module('app', ['ng.district'])
    .controller('AppController', ['$rootScope', '$scope', function ($rootScope, $scope) {

        $scope.districtInfo = {};

        $scope.$watch('districtInfo', function (newVal, oldVal) {
            console.log(newVal)
        }, true);
    }]);