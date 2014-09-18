var app = angular.module("glibrary-admin", ['ngRoute'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider) {
            $routeProvider
                .when('/Repositories', {
                    templateUrl: 'repositories.html',
                    controller: 'repositoriesCtrl'
                })
                .when('/Collections', {
                    templateUrl: 'collections.html',
                    controller: 'collectionsCtrl',
                    //controllerAs: 'chapter'
                })
                .otherwise({redirectTo: '/Repositories'});

            
        }
    ])
    .controller("MainCtrl", function($scope, $location, $log) {
    	$scope.isActive = function(route) {
    		return route === $location.path();
    	}
    	$scope.currentRepo = "";
    	$scope.selectRepo = function(repo) {
    		$scope.currentRepo = repo;
    		$log.info($scope.currentRepo);
    	}
    });