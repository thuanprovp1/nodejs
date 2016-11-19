/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function fetchListProducts(req, res) {
    var Group = require('./group.object');
    var GroupType = require('../group_type/group_type.object');
    var Product = require('../product/product.object');
    Group.find({})
        .populate('grouptype')
        .populate('product')
        .exec(function(err, docs) {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            else {
                res.status(200).json({"data": docs});
            }
        });
};