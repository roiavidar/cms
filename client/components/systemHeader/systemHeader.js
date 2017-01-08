App.directive("systemHeader", function header() {
    return {
        restrict: 'E',
        templateUrl: 'components/systemHeader/systemHeader.html',
        controller: function($scope, $state, LoadProject, User) {
            $scope.user = User.getUser();

            $scope.clearName = function() {
                User.setUserName("");
            };

            $scope.fileNameChanged = function(element) {
                LoadProject.loadTextFile(element.files[0])
                    .then(function resolve() {
                        $state.go('workspace.contentEdit');
                    }, function reject() {
                        $scope.$apply();
                    });
                    
                var file = document.querySelector('input[type="file"]');
                file.value = "";
            };

            $scope.selectFile = function() {
                var file = document.querySelector('input[type="file"]');
                file.click();
            };

            $scope.setUserName = function(userName) {
                User.setUserName(userName);
            };
        }
    };
});