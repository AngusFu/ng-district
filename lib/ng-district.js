var ngDistritc = angular.module('ng.district', [])
ngDistritc.directive('ngDistrict', ['$http', function ($http) {
    return {
        scope: {
            province: '@',
            district: '@',
            county: '@',
            result: '='
        },

        template: '' +
            '<div>' +
                '<select ng-model="provinceId" ng-options="prov.Id as prov.Name for prov in provList">' +
                    '<option value="">--请选择---</option>' +
                '</select>' +
                '<select ng-model="districtId" ng-options="dist.Id as dist.Name for dist in distList">' +
                    '<option value="">--请选择---</option>' +
                '</select>' +
                '<select ng-model="countyId" ng-options="cout.Id as cout.Name for cout in coutList">' +
                    '<option value="">--请选择---</option>' +
                '</select>' +
            '</div>',
        link: function ($scope, iElm, iAttrs, controller) {
            var provURL = $scope.province,
                distURL = $scope.district,
                coutURL = $scope.county;

            var provParam = iAttrs['provParam'] || 'ProvinceId';
            var distParam = iAttrs['distParam'] || 'cityId';

            $http.get(provURL)
                .then(function (res) {
                    $scope.provList = res.data;

                });

            var provUnwatch = $scope.$watch('provinceId', function (newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    getDistData();
                    $scope.result.provinceId = newVal;
                }
            });

            var distUnwatch = $scope.$watch('districtId', function (newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    getCoutData();
                    $scope.result.districtId = newVal;
                }
            });

            var countUnwatch = $scope.$watch('countyId', function (newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    $scope.result.countyId = newVal;
                }
            });

            $scope.$on('$destroy', function () {
                provUnwatch();
                distUnwatch();
                countUnwatch();
            });

            function getDistData() {

                $scope.distList = null;
                $scope.coutList = null;

                var params = {};
                params[provParam] = $scope.provinceId;

                return $http.get(distURL, { params: params })
                            .then(function (res) {
                                $scope.distList = res.data;
                            });
            }

            function getCoutData() {

                $scope.coutList = null;
                
                var params = {};
                params[provParam] = $scope.provinceId;
                params[distParam] = $scope.districtId;

                return $http.get(coutURL, { params: params })
                            .then(function (res) {
                                $scope.coutList = res.data;
                            });
            }
        }
    };
}]);
