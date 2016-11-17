/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function updateProducts(req, res) {
    var errorHandler = function (status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };
    try {
        var Product = require('./product.object');
        var Category = require('../category/category.object');
        var User = require('../user/user.object');

        var validateObjectExist = require('../utils/validateObjectExist');
        var validatePropertyObject = require('../utils/validatePropertyObject');

        var createProduct = function (product) {
            product.code = req.body.code;
            product.name = req.body.name;
            product.price = req.body.price;
            product.category = req.body.category._id;
            product.user = req.body.user._id;

            product.save(function (err, doc) {
                if (err) {
                    errorHandler(400, err);
                }
                else {
                    res.status(201).json(doc);
                }
            });
        };
        Product.findById(req.body._id, function (err, response) {
            Promise.all([
                    validatePropertyObject.call(null, req.body, ['code', 'name','price','category','user' ]),
                    validateObjectExist.call(null, Category, req.body.category._id),
                    validateObjectExist.call(null, User, req.body.user._id)
                ])
                .then(createProduct(response))
                .catch(function (err) {
                    errorHandler(err.status, err.message);
                });
        });
    }
    catch (ex) {
        console.log('update product: ' + ex.toString() + ' inline: ' + ex.stack);
        errorHandler(500, ex);
    }
};