/**
 * Created by Thuan on 10/15/2016.
 */
exports.initGrouptypeRouter = function initGrouptypeRouter(app) {
    var passport = require('passport');

    app.get('/group-type/fetch', passport.authenticate('jwt', {session: false}), function fetchGroup(req, res) {
        var groupType = require('./group_type.object');
        groupType.find({}).exec(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json({"data": docs});
            }
        });
    });
    app.post('/group-type/create', passport.authenticate('jwt', {session: false}), function createGroupType(req, res) {
        var GroupType = require('./group_type.object');
        var validatePropertyObject = require('../utils/validatePropertyObject');

        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        var createGroupType = function () {
            var groupType = new GroupType({
                code: req.body.code
            });
            groupType.save(function (err, docs) {
                if (err) {
                    res.status(400).json({message: err});
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };

        validatePropertyObject(req.body, ['code'])
            .then(createGroupType, errorHandler.bind(null, 400));
    });

    app.post('/group-type/update', passport.authenticate('jwt', {session: false}), function updateGroupType(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        try {
            var GroupType = require('./group_type.object');
            var validatePropertyObject = require('../utils/validatePropertyObject');

            var createGroupType = function (grouptype) {
                grouptype.code = req.body.code;

                grouptype.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            GroupType.findById(req.body._id, function (err, response) {
                Promise.all([
                        validatePropertyObject.call(null, req.body, ['code'])
                    ])
                    .then(createGroupType.bind(null, response))
                    .catch(function (err) {
                        errorHandler(err.status, err.message);
                    });
            });
        }
        catch (ex) {
            console.log('create group: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.get('/group-type/delete', passport.authenticate('jwt', {session: false}), function deleteProducts(req, res) {
        var GroupType = require('./group_type.object');

        GroupType.remove({
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
    });
};