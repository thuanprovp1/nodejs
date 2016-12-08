/**
 * Created by Thuan on 10/15/2016.
 */
exports.initGroupRouter = function initGroupRouter(app) {
    var passport = require('passport');
    
    app.get('/group/fetch', passport.authenticate('jwt', {session: false}), function fetchListProducts(req, res) {
        var Group = require('./group.object');
        var GroupType = require('../group_type/group_type.object');
        var Product = require('../product/product.object');
        Group.find({})
            .populate('grouptype')
            .populate('product')
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

    app.post('/group/create', passport.authenticate('jwt', {session: false}), function createUsers(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };
        try {
            var Group = require('./group.object');
            var GroupType = require('../group_type/group_type.object');
            var Product = require('../product/product.object');
            var validateObjectExist = require('../utils/validateObjectExist');
            var validatePropertyObject = require('../utils/validatePropertyObject');


            var createGroup = function () {
                var group = new Group({
                    grouptype: req.body.grouptype,
                    product: req.body.product
                });

                group.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Promise.all([
                    validatePropertyObject.call(null, req.body, ['grouptype', 'product']),
                    validateObjectExist.call(null, GroupType, req.body.grouptype),
                    validateObjectExist.call(null, Product, req.body.product)
                ])
                .then(createGroup)
                .catch(function (err) {
                    errorHandler(err.status, err.message);
                });

        }
        catch (ex) {
            console.log('create product: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.post('/group/update', passport.authenticate('jwt', {session: false}), function updateGroup(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        try {
            var Group = require('./group.object');
            var GroupType = require('../group_type/group_type.object');
            var Product = require('../product/product.object');
            var validateObjectExist = require('../utils/validateObjectExist');
            var validatePropertyObject = require('../utils/validatePropertyObject');

            var createGroup = function (group) {
                group.grouptype = req.body.grouptype;
                group.product = req.body.product;

                group.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Group.findById(req.body._id, function (err, response) {
                Promise.all([
                        validatePropertyObject.call(null, req.body, ['grouptype', 'product']),
                        validateObjectExist.call(null, GroupType, req.body.grouptype),
                        validateObjectExist.call(null, Product, req.body.product)
                    ])
                    .then(createGroup.bind(null, response))
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
    
    app.get('/group/delete', passport.authenticate('jwt', {session: false}), function deleteProducts(req, res) {
        var Group = require('./group.object');
        Group.remove({
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