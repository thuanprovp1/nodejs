/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createGroupType(req, res) {
    var GroupType = require('./group_type.object');
    var validatePropertyObject = require('../utils/validatePropertyObject');

    var errorHandler = function (status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };

    var createGroupType = function () {
        var groupType = new GroupType({
            code: req.body.code
        });
        groupType.save(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json(docs);
            }
        });
    };

    validatePropertyObject(req.body, ['code'])
        .then(createGroupType, errorHandler.bind(null, 400));

};
