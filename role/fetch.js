/**
 * Created by Thuan on 10/15/2016.
 */

module.exports = function fetchProduct(req, res) {
    var role = require('./role.object');
    role.find({}).exec(function (err, docs) {
        if (err) {
            res.status(400).json({message: err});
        }
        else {
            res.status(200).json({data:docs});
        }
    });
};