App.directive('formGroup', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'js/reusableComponents/formGroup/formGroup.html',
        link: function link(scope, attrs, element) {
            scope.$watch('formGroup.$valid', function(newValue, oldValue) {
                scope.$emit(attrs.eventName, {
                    validation: !newValue
                });
            });
        }
    };
});