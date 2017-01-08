App.directive('focusNewField', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            var enterKeyCode = 13;
            $element.bind('keyup', function(event) {
               if( event.keyCode === enterKeyCode )  {
                   var inputOfNewField = document.querySelector('.Scheme-list>li:last-child input');
                   inputOfNewField.focus();
               }
            });
        }
    };
});