/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function updateGroup(req, res) {
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
};