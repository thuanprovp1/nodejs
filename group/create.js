/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createUsers(req, res) {


    var errorHandler = function(status, message) {
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


        var createGroup = function() {
            var group = new Group({
                grouptype: req.body.grouptype,
                product: req.body.product
            });

            group.save(function(err, doc) {
                if (err) {
                    errorHandler(400, err);
                }
                else {
                    res.status(201).json(doc);
                }
            });
        };
        Promise.all([
                validatePropertyObject.call(null, req.body, ['grouptype','product']),
                validateObjectExist.call(null, GroupType, req.body.grouptype),
                validateObjectExist.call(null, Product, req.body.product)
            ])
            .then(createGroup)
            .catch(function(err) {
                errorHandler(err.status, err.message);
            });

    }
    catch (ex) {
        console.log('create product: ' + ex.toString() + ' inline: ' + ex.stack);
        errorHandler(500, ex);
    }
};