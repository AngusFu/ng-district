# ng-district
省市县三级联动

## TODO: node server, test case

## Demo

```html

<ng-district prov="./data/province.json"
			 city="./data/district.json"
    		 dist="./data/couty.json"
    		 prov-param="ProvinceId"
    		 city-param="cityId"
    		 result="districtInfo">
</ng-district>

<script src="ng-district.js"></script>
<script>
	var app = app.module('app', ['ng.district'])
	
	app.controller(function ($scope){
		$scope.districtInfo = {};

		//　if a deep watch needed
		$scope.$watch('districtInfo', function (newVal, oldVal) {
			// do something
		}, true);
	});
</script>

```


## 参数说明
- ```prov``` 省级行政区数据接口
- ```city``` 地级行政区数据接口
- ```dist``` 县级行政区数据接口

- ```prov-param``` 传给**地、县级**行政区接口的省份id字段名称, 默认为```ProvinceId```
- ```city-param``` 传给**县级**行政区接口的城市id字段名称, 默认为```cityId```

- ```result``` 行政区联动指令所在```scope```中用来绑定数据的对象, 该指令会为该对象加上```[ province | city | district ]Id``` 三个字段


