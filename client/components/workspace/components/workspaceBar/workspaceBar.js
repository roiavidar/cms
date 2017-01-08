 App.directive('workspaceBar', function() {
     return {
         restrict: 'E',
         templateUrl: 'components/workspace/components/workspaceBar/workspaceBar.html',
         controller: function($scope, WorkspaceService) {
            $scope.state = WorkspaceService.getState();

             $scope.saveProject = function saveProject() {

             };

         }
     };
 });