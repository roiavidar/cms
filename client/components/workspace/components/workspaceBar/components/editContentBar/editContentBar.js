App.directive('editContentBar', function() {
    return {
        restrict: "E",
        templateUrl: "components/workspace/components/workspaceBar/components/editContentBar/editContentBar.html",
        controller: function(DataGroupsService, User) {
            this.DataGroupsService = DataGroupsService;
            var dataGroupsState = DataGroupsService.getState();
            this.dataGroups = dataGroupsState.dataGroups;
            this.currentDataGroup = dataGroupsState.currentDataGroup;

            this.isDeveloper = User.isDeveloper;

            this.acceptScheme = function() {
                dataGroupsState.dataGroups[dataGroupsState.currentDataGroup.index].scheme.state = "done";
            };
        },
        controllerAs: 'editContentCtrl',
    };
});