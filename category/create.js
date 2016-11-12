/**
 * Created by Thuan on 10/15/2016.
 */

module.exports = function createCategory(req, res) {
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
    
    validatePropertyObject(req.body, ['name','code'])
        .then(createCategory, errorHandler.bind(null, 400));

};

