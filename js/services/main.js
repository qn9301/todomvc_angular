(function(angular) {
	"use strict";
	// 注册一个新模块
	// 业务逻辑都必须出现在服务中(专门用来定义业务逻辑的)

	angular.module('app.services.main', [])
		.service('MainService', ["$window",function($window) {
			var storage = $window.localStorage;
			var todos = storage['zyf_todos']?JSON.parse(storage['zyf_todos']):[];
			// storage.removeItem("my_todo_list");
			// var todos = [
			// 	{"id":1,"name":"todo1","completed":true},
			// 	{"id":2,"name":"todo2","completed":false}
			// ];
			function getMaxId(){
				var maxId = 0;
				var len = todos.length;
				for(let i = 0;i<len;i++){
					maxId = todos[i].id>maxId?todos[i].id:maxId;
				}
				return maxId;
			}

			var id = getMaxId();

			this.get = function(){
				return todos;
			}

			this.save = function(){
				storage['zyf_todos'] = JSON.stringify(todos);
			}

			this.add = function(text){
				todos.push({
					"id":++id,
					"name":text,
					"completed":false}
					);
				this.save();
			};
			this.remove = function(index){
				for(let i=0;i<todos.length;i++){
					if(todos[i].id==index){
						todos.splice(i,1);
						break;
					}
				}
				this.save();
			};
			this.clear = function(){
				var len=todos.length;
				for(var i=len-1;i>=0;i--){
					if(todos[i].completed){
						todos.splice(i,1);
					}
				}
				this.save();
			};
			this.toggleAll = function(now){
				for(let i=0;i<todos.length;i++){
					todos[i].completed = now;
				}
			};

		}])
})(angular)