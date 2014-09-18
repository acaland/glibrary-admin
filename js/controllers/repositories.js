var app = angular.module("glibrary-admin");




app.controller('repositoriesCtrl', function($scope, $http, $log) {

    function loadRepos() {
        $http.get("http://glibrary.ct.infn.it:3000/repositories")
            .then(function(data) {
                $log.info(data.data.result);
                $scope.repos = data.data.result;
                
            });
    }

    loadRepos();
    

    $scope.create = function() {
    	//$scope.created = true;
    	//$log.info($scope.repoName);
        $http.post("http://glibrary.ct.infn.it:3000/repositories/" + $scope.repoName)
            .success(function(response) {
            	$log.info(response);
                loadRepos();
                $scope.created = true;
            }); 

    }
});