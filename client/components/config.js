App.config(function($stateProvider) {

    $stateProvider
        .state('dashboard', {
            url: "/",
            template: '<dashboard></dashboard>'
        })
        .state('workspace', {
            url: "/workspace",
            template: '<workspace></workspace>'
        })
        .state('workspace.contentEdit', {
            url: "/contentEdit",
            views: {
                "workspaceBar": {
                    template: "<edit-content-bar>"
                },
                "mainArea": {
                    template: "<data-data-groups></data-data-groups>"
                }
            }
        })
        .state('workspace.generate', {
            url: "/generate",
            views: {
                "workspaceBar": {
                    template: "<generate-project-bar>"
                },
                "mainArea": {
                    template: "<generate-project></generate-project>"
                }
            }
        });
});