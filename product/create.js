/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createProduct(req, res) {
    var Product = require('./product.object');
    var validateObjectExist = require('../utils/validateObjectExist');
    var validatePropertyObject = require('../utils/validatePropertyObject');

    var errorHandler = function (status, message) {
        res.status(status).json({   
            message: message.toString()
        });
    };

    var createProduct = function () {
        var product = new Product({
            code: req.body.code,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            user: req.body.user
        });
        product.save(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json(docs);
            }
        });
    };

    validatePropertyObject(req.body, ['name', 'code'])
        .then(validateAllObjectExist, errorHandler.bind(null, 400));

    var validateAllObjectExist = function() {
        validateObjectExist(Category, req.body.category)
            .then(function() {
                validateObjectExist(User, req.body.user)
                    .then(
                        createProduct, errorHandler.bind(null, 400)
                    );
            }, errorHandler.bind(null, 400))
            .catch(function(err) {
                errorHandler(500, err);
            });
    }
};

