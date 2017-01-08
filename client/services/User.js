App.factory('User', function User($location) {
    var user = {
        name: "",
        role: "",
        roleHebrewText: ""
    };

    function setUserName(newUserName) {
        localStorage.setItem('userName', newUserName);
        user.name = newUserName;
    }

    function getUserName() {
        var userName = user.name;
        if (userName === "") {
            userName = localStorage.getItem('userName');
        }

        return userName;
    }

    function getUserRole() {
        var queryParams = $location.search();

        if (user.role !== "") {
            return user.role;
        }
        else if (queryParams["userRole"] === "developer") {
            return "developer";
        }
        else {
            return "editor";
        }
    }
    
    function getUser() {
        user.name = getUserName();
        user.role = getUserRole();
        user.roleHebrewText = getRoleText();
        return user;
    }
    
    function isDeveloper() {
        return user.role === "developer";
    }

    function getRoleText() {
        if (isDeveloper()) {
            return "מצב מפתח";
        }
        else {
            return "מצב עורך";
        }
    }

    return {
        setUserName: setUserName,
        getUser: getUser,
        isDeveloper: isDeveloper,
    };
});