(function(){
	'use strict';
}());

var MyApp = angular.module('MyApp', [
	'ngRoute',
	'MyAppController'
]);

MyApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'mainPage.html'
			})
			.when('/add', {
				templateUrl: 'addTasks.html',
				controller: 'AddTaskController'
			})
			.when('/show', {
				templateUrl: 'showTasks.html',
				controller: 'ShowTaskController'
			})
			.when('/show/delete/:id', {
				templateUrl: "deleteTask.html",
				controller: 'DeleteTaskController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]);


MyApp.provider('TasksProvider', function() {
    this.$get = function() {
        return {
        	tasks:
		    [
				{
					id: 1,
					name: "pouet"
				},
				{
					id: 2,
					name: "patapouet"
				}
			],
			currentId : 2,
            getTasks: function() {
                return this.tasks;
            },
            increaseCurrentId : function() {
            	this.tasks.currentId ++;
            },
            getCurrentId : function() {
            	return this.tasks.currentId;
            },
            addTask: function(task) {
            	this.tasks.push(task); 
            },
            deleteTask: function(idTask){
            	for(var i = 0; i < this.tasks.length; i++){
            		if(this.tasks[i].id == idTask){
            			this.tasks.splice(i, 1);
            		}
            	}
            }
        };
    };
});

var MyAppController = angular.module('MyAppController', []);

MyAppController.controller('AddTaskController', ['$scope', 'TasksProvider',
	function ($scope, TasksProvider){
		$scope.addTask = function(){
			TasksProvider.addTask({id: TasksProvider.getCurrentId(), name: this.newTask.name});
			TasksProvider.increaseCurrentId();
			this.newTask.name = '';
		};
	}
]);

MyAppController.controller('ShowTaskController', ['$scope', 'TasksProvider',
	function ($scope, TasksProvider){
		$scope.tasks = TasksProvider.getTasks();
	}
]);

MyAppController.controller("DeleteTaskController", ['$scope', 'TasksProvider', '$routeParams',
	function ($scope, TasksProvider, $routeParams){
		TasksProvider.deleteTask($routeParams.id);
		$scope.task = {};
		$scope.task.id = $routeParams.id;
	}
]);
