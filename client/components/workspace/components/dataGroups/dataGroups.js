App.directive('dataGroups', function(DataGroupsService) {
    return {
        restrict: 'E',
        templateUrl: 'components/workspace/components/dataGroups/dataGroups.html',
        controller: function($scope) {
            $scope.dataGroupsState = DataGroupsService.getState();
        }
    };
});