App.directive('itemsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/reusableComponents/itemsList/itemsList.html',
        scope: {
            properties: '=ngModel'
        },
        controller: function($scope, $element, $attrs, $compile) {
            var properties = $scope.properties;

            function createNewItem() {
                properties.dataItem = [{
                    name: "",
                    toDelete: false
                }];
            }
            
            // only for first time
            if (!properties.dataItem) {
                createNewItem();
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
            };
        }
    };
});