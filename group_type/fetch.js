/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function fetchGroup(req, res) {
    var groupType = require('./group_type.object');
    groupType.find({}).exec(function (err, docs) {
        if (err) {
            res.status(400).json({message: err});
        }
        else {
            res.status(200).json({"data": docs});
        }
    });
};