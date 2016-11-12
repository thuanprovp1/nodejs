/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function fetchCategorys(req, res) {
    var Category = require('./category.object');
    Category.find({}).exec(function (err, docs) {
        if (err) {
            res.status(400).json({message: err});
        }
        else {
            res.status(200).json({"data": docs});
        }
    });
};