(function(angular) {
	'use strict';
	var controllers = angular.module('app.controllers.main', ['app.services.main'])
	controllers.controller('main', [
		'$scope',
		'checkC',
		// '$location',
		'$routeParams',
		'$route',
		"MainService",
		function($scope, checkC /*,$location*/ , $routeParams, $route, MainService) {
			$scope.todos = MainService.get();
			// 文本框需要一个模型
			$scope.text = '';
			$scope.id = 2;
			// 任务列表需要一个模型
			$scope.comp = '';
			// $scope.todos = [
			// 		{"id":1,"name":"todo1","completed":true},
			// 		{"id":2,"name":"todo2","completed":false}
			// 	];
			$scope.add = function() {
				if(!$scope.text){
					return false;
				}
				MainService.add($scope.text);
				$scope.text = '';
				checkC.checkComplete();
			};



			$scope.i = '';
			$scope.doEdit = function(index, id) {
				$scope.i = index;
				setTimeout(function() {
					document.getElementById(id).focus();
				}, 0)
			};

			$scope.afterEdit = function() {
				$scope.i = '';
			};

			$scope.remove = function(index) {
				MainService.remove(index);
				checkC.checkComplete()
			};

			$scope.clear = function() {
				MainService.clear();
				checkC.checkComplete()
			};

			$scope.toggleAll = function() {
				MainService.toggleAll(document.querySelector(".toggle-all").checked);
			};
			$scope.checkComplete = checkC.checkComplete;

			// $scope.$location = $location;
			// $scope.$watch('$location.path()',function(now, old){
			// 	switch(now){
			// 		case "/active":
			// 			$scope.comp = {'completed':false};
			// 		break;
			// 		case "/completed":
			// 			$scope.comp = {'completed':true};
			// 		break;
			// 		default:
			// 			$scope.comp = '';
			// 		break;
			// 	}
			// })

			var status = $routeParams.status;
			switch (status) {
				case "active":
					$scope.comp = {
						'completed': false
					};
					break;
				case "completed":
					$scope.comp = {
						'completed': true
					};
					break;
				default:
					$route.updateParams({
						status: ''
					})
					$scope.comp = '';
					break;
			}

			$scope.equalsCompare = function(status, get) {
				if (get === '') {
					return true;
				}
				return status === get;
			}

		}
	])

})(angular)