// state options: contentEdit, generateProject

App.factory('WorkspaceService', function() {
    var state = {
        name: "contentEdit"
    };

    function getState() {
        return state;
    }

    return {
        getState: getState
    };
})