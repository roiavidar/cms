// scheme has 2 states -> construction and done and many operations like new,edit,copy that can move it between those states.

App.directive('scheme', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/workspace/components/dataGroups/components/dataGroup/components/scheme/scheme.html',
        scope: {
            properties: '=ngModel'
        },
        controller: function($scope, DataGroupsService) {
            var properties = $scope.properties;
            var dataGroupsState = DataGroupsService.getState();
            
            function createNewScheme() {
                properties.dataItem = [{
                    name: "",
                    toDelete: false
                }];
            }
            
            // only for first time
            if (!properties.dataItem && properties.operation === "new") {
                createNewScheme();
            }

            $scope.addRow = function addRow() {
                properties.dataItem.push({
                    name: null,
                    toDelete: false
                });
            };

            $scope.removeRow = function removeRow(index) {
                if (properties.dataItem.length <= 1) {
                    return;
                }
                
                if(properties.operation === "new") {
                    properties.dataItem.splice(index, 1);
                } else if(properties.operation === "edit") {
                    properties.dataItem[index].toDelete = true;
                }
            };

            $scope.$watch('scheme.$valid', function(newValue, oldValue) {
                dataGroupsState.currentDataGroup.validation = !newValue;
            });

        }
    };
});