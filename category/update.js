/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function updateCategory(req, res) {
    var errorHandler = function(status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };

    try {
        var Category = require('./category.object');
        var validatePropertyObject = require('../utils/validatePropertyObject');

        Category.findById(req.body.id, function(err, response) {
            if (response) {
                validatePropertyObject(req.body, ['code', 'name'])
                    .then(createCategory.bind(null, response), errorHandler.bind(null, 400));
            }
            else {
                res.status(400).json({message: "Category not exist"});
            }
        });

        var createCategory = function(category) {
             category.code = req.body.code;
             category.name = req.body.name;

            category.save(function(err, doc) {
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
};
