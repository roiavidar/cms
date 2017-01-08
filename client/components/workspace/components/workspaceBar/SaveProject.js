App.factory('SaveProject', function saveProject(DataGroupsService, ProjectInfo, User) {
    var phase = {
        save: false
    }

    function saveProject() {
        phase.save = true;
        var dataGroups = DataGroupsService.getState().dataGroups;
        var header = ProjectInfo.getState().header;
        
        var jsonProject = generateJSON.generate(dataGroups);
        jsonProject.projectName = header;
        jsonProject.lastModifier = User.getUserName();
        var fileName = jsonProject.projectName || "interactiveProject";
        var file = new File([JSON.stringify(jsonProject)], fileName + ".txt", {
            type: "text/plain;charset=utf-8"
        });
        saveAs(file);
    }



    function generateJSON(dataGroups) {
        var jsonProject = {};
        dataGroups.forEach(function(dataGroup) {
            if (dataGroup.items.length === 0) {
                return;
            }
            jsonProject[dataGroup.scheme.header] = {};
            var dataGroupJSON = jsonProject[dataGroup.scheme.header];

            dataGroupJSON["items"] = [];
            dataGroup.items.forEach(function(dataItem) {
                var item = {};
                dataItem.forEach(function(prop) {
                    item[prop.name] = prop.value;
                });
                dataGroupJSON["items"].push(item);
            });
        });

        return jsonProject;
    }
    
    function getPhase() {
        return phase;
    }
    
    return {
        saveProject: saveProject,
        getPhase: getPhase
    };
});