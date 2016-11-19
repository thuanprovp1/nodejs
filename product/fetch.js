/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function fetchProduct(req, res) {
    var Product = require('./product.object');
    var Category = require('../category/category.object');
    var User = require('../user/user.object');

    Product.find({})
        .populate('category')               //thuoc tinh cua object
        .populate('user')
        .exec(function (err, docs) {
        if (err) {
            res.status(400).json({message: err});
        }
        else {
            res.status(200).json({"data": docs});
        }
    });
};