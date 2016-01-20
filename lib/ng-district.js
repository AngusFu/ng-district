angular.module('ng.district', [])
    .directive('ngDistrict', ['$http', function ($http) {
        return {
            scope: {
                prov: '@',
                city: '@',
                dist: '@',
                result: '='
            },

            template: '\
                <div class="ng-district-wrap">\
                    <label>\
                        <select ng-model="provinceId" ng-options="prov.Id as prov.Name for prov in provList">\
                            <option value="">--请选择---</option>\
                        </select>\
                    </label>\
                    <label ng-show="showCity">\
                        <select ng-model="cityId" ng-options="city.Id as city.Name for city in cityList">\
                            <option value="">--请选择---</option>\
                        </select>\
                    </label>\
                    <label ng-show="showDist">\
                        <select ng-model="districtId" ng-options="dist.Id as dist.Name for dist in distList">\
                            <option value="">--请选择---</option>\
                        </select>\
                    </label>\
                </div>',

            link: function ($scope, iElm, iAttrs, controller) {
                var provURL = $scope.prov,
                    cityURL = $scope.city,
                    distURL = $scope.dist;
                
                $scope.showCity = !!cityURL;
                $scope.showDist = !!distURL;

                var provParam = iAttrs['provParam'] || 'ProvinceId';
                var cityParam = iAttrs['cityParam'] || 'cityId';

                $http.get(provURL)
                    .then(function (res) {
                        $scope.provList = res.data;
                    });

                var provUnwatch = $scope.$watch('provinceId', function (newVal, oldVal) {
                    if (newVal && newVal !== oldVal) {
                        getCityData();
                        $scope.result.provinceId = newVal;
                    }
                });

                var cityUnwatch = $scope.$watch('cityId', function (newVal, oldVal) {
                    if (newVal && newVal !== oldVal) {
                        getDistrictData();
                        $scope.result.cityId = newVal;
                    }
                });

                var distUnwatch = $scope.$watch('districtId', function (newVal, oldVal) {
                    if (newVal && newVal !== oldVal) {
                        $scope.result.districtId = newVal;
                    }
                });

                $scope.$on('$destroy', function () {
                    provUnwatch();
                    cityUnwatch();
                    distUnwatch();
                });

                function getCityData() {
                    if (!$scope.showCity) return;

                    $scope.cityList = null;
                    $scope.distList = null;

                    var params = {};
                    params[provParam] = $scope.provinceId;

                    return $http.get(cityURL, { params: params })
                                .then(function (res) {
                                    $scope.cityList = res.data;
                                });
                }

                function getDistrictData() {
                    if (!$scope.showDist) return;

                    $scope.distList = null;
                    
                    var params = {};
                    params[provParam] = $scope.provinceId;
                    params[cityParam] = $scope.cityId;

                    return $http.get(distURL, { params: params })
                                .then(function (res) {
                                    $scope.distList = res.data;
                                });
                }
            }
        };
    }]);
