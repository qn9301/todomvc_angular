(function (angular) {
	'use strict';
	// 注入ngroute模块
	var app = angular.module('app',['ngRoute','app.controllers.main']);
	// 配置路由规则
	// 	 规则指的是，什么样的请求，找什么控制器
	//   [{url:"",controller:"mainController"},...]
 	// 如果连入第三方文件时，不写协议的话：可以用//baidu.com的形式

 	// 路由器配置
 	app.config(["$routeProvider",function($routeProvider){
 		$routeProvider
 		// ?表示可以为空
 			.when('/',{
 				controller:"main",
 				templateUrl:"main_tmpl"
 			})
 			.when('/:status',{
 				controller:"main",
 				templateUrl:"main_tmpl"
 			})
 			.otherwise({ redirectTo: '/' })
 	}])

	app.factory('checkC', ['$rootScope',function ($rootScope) {
		return {
			checkComplete:function(){
				var scope = $rootScope.$$childHead
				let num = 0;
				let len = scope.todos.length;
				for(let i=0;i<len;i++){
					if(scope.todos[i].completed){
						num++;
					}
				}
				let toggle = document.querySelector(".toggle-all");
				if(num == len){
					toggle.checked = true;
				}else{
					toggle.checked = false;
				}
			}
		};
	}])
	
})(angular);
