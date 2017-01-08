App.directive('focusNewItem', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            var enterKeyCode = 13;
            $element.bind('keyup', function(event) {
               if( event.keyCode === enterKeyCode )  {
                   var inputOfNewDataItem = document.querySelector('.DataGroup-items>li:last-child input');
                   inputOfNewDataItem.focus();
               }
            });
        }
    };
});