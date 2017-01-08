 App.directive('notificationFormatError', function() {
     return {
         restrict: 'E',
         templateUrl: 'components/dashboard/components/notifications/formatError/notificationFormatError.html',
         controller: function($scope, LoadProject) {
            var notification = $scope.notification = {
                fileObj: LoadProject.getFileObj()
            };
            
            $scope.close = function close() {
                notification.fileObj.formatError = false;
            }
            
         }
     };
 });