/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function deleteProduct(req, res) {
    var ObjectId = require("mongodb").ObjectId;

    global.db.collection('category').deleteOne(
        {_id: ObjectId(req.query.id)},
        function (err, doc) {
            if (err)
                res.status(400).json({message: err});
            else {
                res.status(202).json({message: "delete success"});
            }
        }
    )

};