var app = angular.module("glibrary-admin");

function prepareTree(rowData) {

    var unflatten = function(array, parent, tree) {

        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : {
            id: 0
        };

        var children = _.filter(array, function(child) {
            return child.ParentID == parent.id;
        });

        if (!_.isEmpty(children)) {
            if (parent.id == 0) {
                tree = children;
            } else {
                parent['children'] = children
            }
            _.each(children, function(child) {
                unflatten(array, child)
            });
        }

        return tree;
    }

    var arr = rowData;
    for (var i = 0; i < arr.length; i++) {
        arr[i]['label'] = arr[i]['TypeName'];
        //delete arr[i]['TypeName'];
        arr[i]['data'] = {};
        for (attr in arr[i]) {
            if (attr != 'data' && attr != 'id' && attr != 'ParentID' && attr != 'label') {
                arr[i]['data'][attr] = arr[i][attr];
                delete arr[i][attr];
            }
        }
    }
    var tree = unflatten(arr);
    return tree;
}





app.controller('collectionsCtrl', function($scope, $http, $log, $timeout) {

    function loadCollection() {
        if (!$scope.currentRepo) {
            return;
        };
        $log.info("currentRepo is " + $scope.currentRepo);
        $http.get("http://glibrary.ct.infn.it:3000/" + $scope.currentRepo)
            .success(function(data) {
                $scope.collections = data.results;
                $log.info($scope.collections);
                $scope.my_data = prepareTree(data.results);
                $timeout(function() {
                    $scope.my_tree.expand_all();
                }, 0); 

            });
    }

    function getCollectionSchema(name) {
        $http.get("http://glibrary.ct.infn.it:3000/" + $scope.currentRepo + "/" + name)
            .success(function(data) {
                //$log.info(data);
                var schema = {};
                for (attr in data) {
                    if (attr != "TypeName" && attr != "Path" && attr != "VisibleAttrs" && attr != "FilterAttrs"
                            && attr != "ColumnWidth" && attr != "ParentID") {
                        schema[attr] = data[attr];
                    }
                }
                $scope.collectionSchema = schema;
                $log.info(schema);
            });
    }
    $scope.my_data = [];
    $scope.my_tree = {};
    loadCollection();
    $scope.$on("reloadCollection", loadCollection);
    $scope.my_tree_handler = function(branch) {
        $log.info(branch.data.Type);
        getCollectionSchema(branch.data.Type);
    }

});