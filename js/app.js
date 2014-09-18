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
    ]);