/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function deleteProduct(req, res) {
    var ObjectId = require('mongodb').ObjectID;
    global.db.collection('group').deleteOne(
        {_id: ObjectId(req.query.id)},
        function (err, doc) {
            if (err)
                res.status(400).json({message: err});
            else {
                console.log(req.param.id);
                res.status(202).json({message: "delete success"});
            }
        }
    )

};