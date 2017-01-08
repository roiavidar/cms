App.directive('workspace', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/workspace/workspace.html',
        controller: function($scope, $state, LoadProject) {

            // route back to the dashboard if user refreshed the browser
            if (LoadProject.isFileHandlerExist() === false) {
                $state.go('dashboard');
            }
        }
    };
});