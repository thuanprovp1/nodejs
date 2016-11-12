/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createProduct(req, res) {
    var Role = require('./role.object');
    var validatePropertyObject = require('../utils/validatePropertyObject');

    var errorHandler = function (status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };

    var createRole = function () {
        var role = new Role({
            name: req.body.name
        });
        role.save(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json(docs);
            }
        });
    };

    validatePropertyObject(req.body, ['name'])
        .then(createRole, errorHandler.bind(null, 400));

};
