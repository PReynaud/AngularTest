'use strict';

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
					name: "pouet"
				},
				{
					name: "patapouet"
				}
			],
            getTasks: function() {
                return this.tasks;
            },
            addTask: function(task) {
            	this.tasks.push(task); 
            }
        };
    };
});

var MyAppController = angular.module('MyAppController', []);

MyAppController.controller('AddTaskController', ['$scope', 'TasksProvider',
	function ($scope, TasksProvider){
		$scope.addTask = function(){
			TasksProvider.addTask({name: this.newTask.name});
			this.newTask.name = '';
		};
	}
]);

MyAppController.controller('ShowTaskController', ['$scope', 'TasksProvider',
	function ($scope, TasksProvider){
		$scope.tasks = TasksProvider.getTasks();
		this.tasks = TasksProvider.getTasks();
	}
]);
