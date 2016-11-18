/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function updateGroupType(req, res) {
    var errorHandler = function (status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };

    try {
        var GroupType = require('./group_type.object');
        var validatePropertyObject = require('../utils/validatePropertyObject');

        var createGroupType = function (grouptype) {
            grouptype.code = req.body.code;

            grouptype.save(function (err, doc) {
                if (err) {
                    errorHandler(400, err);
                }
                else {
                    res.status(201).json(doc);
                }
            });
        };
        GroupType.findById(req.body.id, function (err, response) {
            Promise.all([
                    validatePropertyObject.call(null, req.body, ['code'])
                ])
                .then(createGroupType.bind(null, response))
                .catch(function (err) {
                    errorHandler(err.status, err.message);
                });
        });
    }
    catch (ex) {
        console.log('create group: ' + ex.toString() + ' inline: ' + ex.stack);
        errorHandler(500, ex);
    }
};