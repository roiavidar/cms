App.factory("LoadProject", function(ProjectInfo, $interval, DataGroupsService) {
    var fileObj = {
        overriden: false,
        formatError: false
    };

    function fileLoaded(projectString) {
        try {
            var dataGroupsState = DataGroupsService.getState();
            var dataGroups = dataGroupsState.dataGroups;
            var counter = dataGroupsState.counter;
            var projectInfoState = ProjectInfo.getState();
            
            var data = projectString;
            var dataGroupsJSON = JSON.parse(data);

            projectInfoState.header = dataGroupsJSON.projectName || fileObj.name;

            // new project
            if (data === "") {
                projectInfoState.header = fileObj.fileHandler.name.substring(0, fileObj.fileHandler.name.length - 4);
                DataGroupsService.create();
            }

            for (var dataGroupHeadLine in dataGroupsJSON) {
                var dataGroup = {};

                dataGroup.scheme = {};
                dataGroup.scheme.header = dataGroupHeadLine;
                dataGroup.scheme.dataItem = [];
                dataGroup.scheme.operation = "edit";
                dataGroup.scheme.state = "done";

                if (dataGroupsJSON[dataGroupHeadLine]["items"] === undefined) {
                    break;
                }

                var dataGroupPresentorForScheme = dataGroupsJSON[dataGroupHeadLine]["items"][0];
                for (var schemeKey in dataGroupPresentorForScheme) {
                    dataGroup.scheme.dataItem.push({
                        name: schemeKey
                    });
                }

                dataGroup.items = [];
                for (var i = 0; i < dataGroupsJSON[dataGroupHeadLine]["items"].length; i++) {
                    var dataItemArr = [];
                    dataGroup.items.push(dataItemArr);
                    for (var prop in dataGroupsJSON[dataGroupHeadLine]["items"][i]) {
                        dataItemArr.push({
                            name: prop,
                            value: dataGroupsJSON[dataGroupHeadLine]["items"][i][prop]
                        });
                    }
                }

                dataGroup.id = counter.dataGroupId;
                counter.dataGroupId++;

                dataGroups.push(dataGroup);
                watchFileHandler();
            }
            return true;
        }
        catch (err) {
            fileObj.formatError = true;
            return false;
        }
    }

    function watchFileHandler() {
        fileObj.lastModified = fileObj.fileHandler.lastModified;
        fileObj.stop = $interval(checkFileOverride, 1000);
        fileObj.isOverridden = false;
    }

    function checkFileOverride() {
        if (fileObj.fileHandler.lastModified !== fileObj.lastModified) {
            if (!flags.savePhase) {
                loadTextFile(fileObj.fileHandler).then(function(projectString) {
                    var projectJSON = JSON.parse(projectString);
                    ProjectState.setValueOf('userName', projectJSON.lastModifier);
                    fileObj.isOverridden = true;
                });
            }
            else {
                flags.savePhase = false;
            }
            fileObj.lastModified = fileObj.fileHandler.lastModified;
        }
    }

    function loadTextFile(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var isLoaded;
                isLoaded = fileLoaded(reader.result);
                isLoaded ? resolve(reader.result) : reject(reader.result);
            };
            fileObj.fileHandler = file;
            reader.readAsText(file);
        });
    }

    function isFileHandlerExist() {
        return !!fileObj.fileHandler;
    }

    function getFileObj() {
        return fileObj;
    }

    return {
        fileLoaded: fileLoaded,
        loadTextFile: loadTextFile,
        isFileHandlerExist: isFileHandlerExist,
        getFileObj: getFileObj
    };
});