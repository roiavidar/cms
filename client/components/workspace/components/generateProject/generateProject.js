App.directive('generateProject', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/workspace/components/generateProject/generateProject.html',
        scope: {
            dataGroups: "=ngModel"
        },
        controller: function($scope, $http, generateProjectJSON) {
            $scope.data = {
                link: undefined,
                projectData: ""
            };

            $scope.generateProject = function generateProject() {
                $http({
                    method: 'GET',
                    url: $scope.data.link
                }).then(function successCallback(response) {
                    var projectJSON = generateProjectJSON.generate($scope.dataGroups);
                    var projectWithData = "var projectData = " + JSON.stringify(projectJSON) + "; \n" + response.data;
                    $scope.data.projectData = projectWithData;
                }, function errorCallback(response) {
                    console.dir(response);
                    $scope.data.projectData = response.status + " " + response.statusText;
                });
            };
        }
    };
});
