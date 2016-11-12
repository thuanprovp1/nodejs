/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createGroup(req, res) {
    var Group = require('./group.object');
    var validateObjectExist = require('../utils/validateObjectExist');
    var validatePropertyObject = require('../utils/validatePropertyObject');

    var errorHandler = function (status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };

    var createGroup = function () {
        var group = new Group({
            groupType: req.body.groupType,
            product: req.body.product
        });
        group.save(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json(docs);
            }
        });
    };

    validatePropertyObject(req.body, ['groupType','product'])
        .then(createGroup, errorHandler.bind(null, 400));

};

