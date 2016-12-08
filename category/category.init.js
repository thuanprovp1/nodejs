/**
 * Created by Thuan on 10/15/2016.
 */
exports.initCategoryRouter = function initCategoryRouter(app) {
    var passport = require('passport');

    app.get('/category/fetch', passport.authenticate('jwt', {session: false}),
        function fetchCategorys(req, res) {
            var Category = require('./category.object');
            Category.find({}).exec(function (err, docs) {
                if (err) {
                    res.status(400).json({message: err});
                }
                else {
                    res.status(200).json({"data": docs});
                }
            });
        }
    );

    app.post('/category/create', passport.authenticate('jwt', {session: false}), function createCategory(req, res) {
        var Category = require('../category/category.object');
        var validatePropertyObject = require('../utils/validatePropertyObject');

        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        var createCategory = function () {
            var category = new Category({
                code: req.body.code,
                name: req.body.name
            });
            category.save(function (err, docs) {
                if (err) {
                    res.status(400).json({message: err});
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };

        validatePropertyObject(req.body, ['name', 'code'])
            .then(createCategory, errorHandler.bind(null, 400));

    });
    
    app.post('/category/update', passport.authenticate('jwt', {session: false}), function updateCategory(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        try {
            var Category = require('./category.object');
            var validatePropertyObject = require('../utils/validatePropertyObject');

            Category.findById(req.body._id, function (err, response) {
                if (response) {
                    validatePropertyObject(req.body, ['code', 'name'])
                        .then(createCategory.bind(null, response), errorHandler.bind(null, 400));
                }
                else {
                    res.status(400).json({message: "Category not exist"});
                }
            });

            var createCategory = function (category) {
                category.code = req.body.code;
                category.name = req.body.name;

                category.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            }
        }
        catch (ex) {
            console.log('create category: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });
    
    app.get('/category/delete', passport.authenticate('jwt', {session: false}), function deleteProducts(req, res) {
        var Category = require('./category.object');

        Category.remove({
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