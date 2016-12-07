/**
 * Created by Thuan on 10/15/2016.
 */
exports.initProductRouter = function initProductRouter(app) {
    var passport = require('passport');
    app.get('/product/fetch', passport.authenticate('jwt', {session: false}), function fetchProduct(req, res) {
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
    });
    
    app.post('/product/create', passport.authenticate('jwt', {session: false}), function createProducts(req, res) {


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


            var createProduct = function () {
                var product = new Product({
                    code: req.body.code,
                    name: req.body.name,
                    price: req.body.price,
                    url: req.body.url,
                    category: req.body.category,
                    user: req.body.user
                });

                product.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Promise.all([
                    validatePropertyObject.call(null, req.body, ['code', 'name', 'price','url', 'category', 'user']),
                    validateObjectExist.call(null, Category, req.body.category),
                    validateObjectExist.call(null, User, req.body.user)
                ])
                .then(createProduct)
                .catch(function (err) {
                    errorHandler(err.status, err.message);
                });

        }
        catch (ex) {
            console.log('create product: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.post('/product/update', passport.authenticate('jwt', {session: false}), function updateProduct(req, res) {
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
                product.url = req.body.url;
                product.category = req.body.category;
                product.user = req.body.user;

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
                        validatePropertyObject.call(null, req.body, ['code', 'name', 'price','url','category','user']),
                        validateObjectExist.call(null, Category, req.body.category),
                        validateObjectExist.call(null, User, req.body.user)
                    ])
                    .then(createProduct.bind(null, response))
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
    
    app.get('/product/delete', passport.authenticate('jwt', {session: false}), function deleteProducts(req, res) {
        var Product = require('./product.object');

        Product.remove({
                _id: req.query.id
            },
            function(err, doc) {
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