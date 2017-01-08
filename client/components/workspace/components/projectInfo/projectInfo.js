App.directive('projectInfo', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/workspace/components/projectInfo/projectInfo.html',
        controller: function($scope, ProjectInfo) {
            $scope.state = ProjectInfo.getState();
        }
    };
});