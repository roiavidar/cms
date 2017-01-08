var usersType = {
    "admin": {
        type: "admin",
        permissions: {
            "createUsers": ["all"]
        }
    },
    "developer": {
        type: "developer",
        permissions: {
            "createUsers": [],
            "crud": ["read", "write", "edit"]
        }
    },
    "editor-supervisor": {
        type: "editor-supervisor",
        permissions: {
            "createUsers": ["editor"],
            "crud": ["read", "write"]
        }
    },
    "editor": {
        type: "editor",
        permissions: {
            "crud": ["read", "write"]
        }
    }
};

var UserType = mongoose.model('UserType', new Schema({
        type: {
            type: String,
            unique: true,
            required: true
        },
        permissions: Object
    }));

for(var userType in usersType) {
    new UserType();
    UserType.save(usersType[userType]);
}

new UserType({
    name: 'Nick Cerminara',
    password: 'password',
    type: 'Admin',
    groups: {
        "food": ["hamburgerProject"]
    },
});

// save the sample user
nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({
        success: true
    });
});
