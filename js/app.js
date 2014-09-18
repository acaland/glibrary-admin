var app = angular.module("glibrary-admin", ['ngRoute'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider) {
            $routeProvider
                .when('/Repositories', {
                    templateUrl: 'repositories.html',
                    controller: 'repositories'
                })
                .when('/Collections', {
                    templateUrl: 'collections.html'
                    //controller: 'ChapterCtrl',
                    //controllerAs: 'chapter'
                })
                .otherwise({redirectTo: '/Repositories'});

            
        }
    ]);