App.factory('ProjectInfo', function() {
    var state = {
        header: ""
    };

    function getState() {
        return state;
    }

    return {
        getState: getState
    };
});