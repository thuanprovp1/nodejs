/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createUser(req, res) {
    var User = require('./user.object');
    var validateObjectExist = require('../utils/validateObjectExist');
    var validatePropertyObject = require('../utils/validatePropertyObject');

    var errorHandler = function (status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };

    var createUser = function () {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        });
        user.save(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json(docs);
            }
        });
    };

    validatePropertyObject(req.body, ['username', 'password', 'role'])
        .then(validateAllObjectExits, errorHandler.bind(null, 400));

    var validateAllObjectExits = function () {
        validateObjectExist(user, req.body.username)
            .then(function () {
                validateObjectExist(user, req.body.password)
                    .then(
                        createUser, errorHandler.bind(null, 400)
                    );
            }, errorHandler.bind(null, 400))
            .catch(function (err) {
                errorHandler(500, err);
            });
    };
};