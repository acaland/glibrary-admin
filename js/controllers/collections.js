var app = angular.module("glibrary-admin");




app.controller('collectionsCtrl', function($scope, $http, $log) {

	function loadCollection() {
		if (!$scope.currentRepo) {
			return;
		};
		$http.get("http://glibrary.ct.infn.it:3000" + $scope.currentRepo)
			.success(function(data) {
				$scope.collections = data.results;
				$log.info($scope.collections);
			});
	}

	loadCollection();
});