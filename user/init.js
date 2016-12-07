/**
 * Created by Thuan on 10/15/2016.
 */
exports.initUserRouter = function initUserRouter(app) {
    var passport = require('passport');

    app.get('/user/fetch', passport.authenticate('jwt', {session: false}), function fetchListProducts(req, res) {
        var User = require('./user.object');
        var Role = require('../role/role.object');
        User.find({})
            .populate('role')
            .exec(function (err, docs) {
                if (err) {
                    res.status(400).json({
                        message: err
                    });
                }
                else {
                    res.status(200).json({"data": docs});
                }
            });
    });

    app.post('/user/create', passport.authenticate('jwt', {session: false}), function createUsers(req, res) {

        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };
        try {
            var User = require('./user.object');
            var Role = require('../role/role.object');
            var validateObjectExist = require('../utils/validateObjectExist');
            var validatePropertyObject = require('../utils/validatePropertyObject');


            var createUser = function () {
                var user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role
                });

                user.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Promise.all([
                    validatePropertyObject.call(null, req.body, ['username', 'password', 'role']),
                    validateObjectExist.call(null, Role, req.body.role)
                ])
                .then(createUser)
                .catch(function (err) {
                    errorHandler(err.status, err.message);
                });
        }
        catch (ex) {
            console.log('create product: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.post('/user/update', passport.authenticate('jwt', {session: false}), function updateUser(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        try {
            var User = require('./user.object');
            var Role = require('../role/role.object');
            var validateObjectExist = require('../utils/validateObjectExist');
            var validatePropertyObject = require('../utils/validatePropertyObject');

            var createUser = function (user) {
                user.username = req.body.username;
                user.password = req.body.password;
                user.role = req.body.role;

                user.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            User.findById(req.body._id, function (err, response) {
                Promise.all([
                        validatePropertyObject.call(null, req.body, ['username', 'password', 'role']),
                        validateObjectExist.call(null, Role, req.body.role)
                    ])
                    .then(createUser.bind(null, response))
                    .catch(function (err) {
                        errorHandler(err.status, err.message);
                    });
            });
        }
        catch (ex) {
            console.log('create user: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.get('/user/delete', passport.authenticate('jwt', {session: false}), function deleteProducts(req, res) {
        var User = require('./user.object');

        User.remove({
                _id: req.query.id
            },
            function (err, doc) {
                if (err)
                    res.status(400).json({
                        message: err
                    });
                else
                    res.status(200).json({
                        message: "delete success"
                    })
            });
    });               // khong can khai báo :id
};