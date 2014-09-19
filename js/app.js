var app = angular.module("glibrary-admin", ['ngRoute', 'angularBootstrapNavTree', 'ngAnimate'])
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
                .otherwise({
                    redirectTo: '/Repositories'
                });


        }
    ])
    .controller("MainCtrl", function($scope, $location, $http, $log) {
        $scope.isActive = function(route) {
            return route === $location.path();
        }
        $scope.currentRepo = "";
        $scope.repos = [];
        $scope.selectRepo = function(repo) {
            $scope.currentRepo = repo;
            $log.info($scope.currentRepo);
            $scope.$broadcast('reloadCollection');
        }

        $scope.loadRepos = function() {
            $http.get("http://glibrary.ct.infn.it:3000/repositories")
                .then(function(data) {
                    $log.info(data.data.result);
                    var repos = data.data.result;

                    for (var i = 0; i < repos.length; i++) {
                        repos[i] = repos[i].slice(1);
                    }

                    $scope.repos = repos;

                });
        };
        $scope.loadRepos();
    });