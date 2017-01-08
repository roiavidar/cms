App.factory('DataGroupsService', function() {
    var state = {
        dataGroups: [],
        currentDataGroup: {
            index: 0,
            validation: true
        },
        counter: {
            dataGroupId: 0,
        }
    };


    function create(scheme, indexToInsert) {
        if (scheme === undefined) {
            scheme = {};
            scheme.state = "construction";
            scheme.operation = "new";
            var preHebrew = "גיליון חדש ";
            scheme.header = preHebrew + (parseInt(state.dataGroups.length) + 1);
        }
        state.currentDataGroup.index = indexToInsert || state.counter.dataGroupId;
        var data = {
            scheme: scheme,
            items: [],
            id: state.counter.dataGroupId++
        };

        if (indexToInsert !== undefined) {
            state.dataGroups.splice(indexToInsert, 0, data);
        }
        else {
            state.dataGroups.push(data);
        }
    }

    function dataGroupSelected(selectedDataGroup) {
        state.currentDataGroup.index = selectedDataGroup;
    }


    function getState() {
        return state;
    }

    function copyScheme() {
        var copyItem = angular.copy(state.dataGroups[state.currentDataGroup.index].scheme.dataItem);
        var copyScheme = {
            dataItem: copyItem
        };
        copyScheme.operation = "copy";
        copyScheme.state = "construction";
        copyScheme.header = "העתק של " + state.dataGroups[state.currentDataGroup.index].scheme.header;
        create(copyScheme, state.currentDataGroup.index + 1);
    }

    function editScheme() {
        state.dataGroups[state.currentDataGroup.index].scheme.state = "construction";
        state.dataGroups[state.currentDataGroup.index].scheme.operation = "edit";
    }

    function deleteDataGroup() {
        state.dataGroups.splice(state.currentDataGroup.index, 1);

        if (state.dataGroups.length === 0) {
            create();
        }

        state.currentDataGroup.index = 0;
    }
    
    return {
        create: create,
        getState: getState,
        dataGroupSelected: dataGroupSelected,
        copyScheme: copyScheme,
        editScheme: editScheme,
        deleteDataGroup: deleteDataGroup
    };
});