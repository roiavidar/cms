var User = require('./user');
var app = require('../../server2');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userTypesStore = require('./types');

module.exports = function signUp(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var userType = req.body.userType;
    var projects = JSON.parse(req.body.projects);
    var creatingUser = req.decoded;

    checkRequestValidation(req, res);

    if (creatingUser.type.permissions["create"].indexOf(userType) > -1) {
        if (is) {}

    }
    else {
        res.status(403).json({
            success: false,
            desc: "User does not have permissions to create this kind of user"
        });
    }
};

function checkRequestValidation(req, res) {
    if (req.body.userName.length < 6) {
        res.send(200).json({
            success: false,
            desc: "password must be at least 6 chars"
        });
    }

    if (req.body.password.length < 6) {
        res.send(200).json({
            success: false,
            desc: "password must be at least 6 chars"
        });
    }

    if (userTypesStore[req.body.userType] === undefined) {
        res.send(200).json({
            success: false,
            desc: "user-type does not exist"
        });
    }
    
    if () {
        
    }

}