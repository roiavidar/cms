App.directive('dataGroup', function() {
    return {
        restrict: 'E',
        scope: {
            dataGroup: '=ngModel'
        },
        templateUrl: 'components/workspace/components/dataGroups/components/dataGroup/dataGroup.html',
        controller: function($scope, User) {
            $scope.scheme = $scope.dataGroup.scheme;
            $scope.items = $scope.dataGroup.items;

            $scope.createNewDataItem = function createNewDataItem() {
                var item = [];
                $scope.scheme.dataItem.forEach(function(prop) {
                    item.push({
                        name: prop.name,
                        value: ""
                    });
                });
                $scope.items.push(item);
            };

            $scope.$watch('dataGroup.scheme.state', function(newState, oldState) {
                var operation = $scope.scheme.operation;
                if (newState !== "done" || newState === oldState) {
                    return;
                }

                if (operation === "new" || operation === "copy") {
                    $scope.createNewDataItem();
                }
                else if (operation === "edit") {
                    editDataGroup();
                }
            });

            $scope.removeDataItem = function(index, items) {
                if (items.length > 1) {
                    items.splice(index, 1);
                }
            };

            $scope.isDeveloper = User.isDeveloper;

            function editDataGroup() {
                $scope.scheme.state = "done";
                var scheme = $scope.scheme.dataItem;
                var items = $scope.items;

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    for (var j = 0; j < scheme.length; j++) {
                        if (item[j] && scheme[j].name !== item[j].name) { // re-name
                            item[j].name = scheme[j].name;
                        }
                        else if (!item[j]) { // add
                            item.push({
                                name: scheme[j].name,
                                value: ""
                            });
                        }
                        //remove
                        if (scheme[j].toDelete === true) {
                            item.splice(j,1);
                            scheme.splice(j,1);
                        }
                    }
                }
            }
        }
    };
});