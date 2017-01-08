App.directive('menu', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/workspace/components/menu/menu.html',
        controller: function($scope, DataGroupsService, User) {
            var dataGroupsState = DataGroupsService.getState();
            $scope.menu = { 
                currentDataGroup: dataGroupsState.currentDataGroup,
                dataGroups: dataGroupsState.dataGroups
            };
            
            $scope.isDeveloper = User.isDeveloper;
            
            $scope.setActive = function setActive(index) {
                dataGroupsState.currentDataGroup.index = index;
            };
            
            $scope.createDataGroup = function createDataGroup() {
                dataGroupsState.create();
            };
        }
    };
});