var User = require('./user');
var jwt = require('jsonwebtoken');
var app = require('../../server2');
var bcrypt = require('bcrypt');

module.exports = function signIn(req, res) {
    User.findOne({
        name: req.body.userName
    }, function(err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.status(200).json({
                success: false,
                desc: "user-name or password does not match"
            });
        }
        else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
            else {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            }
        }
    });
};
