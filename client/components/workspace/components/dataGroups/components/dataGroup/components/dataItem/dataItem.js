App.directive('dataItem', function() {
   return {
      restrict: 'E',
      scope: {
         properties: '=ngModel'
      },
      templateUrl: 'components/workspace/components/dataGroups/components/dataGroup/components/dataItem/dataItem.html'
   };
});