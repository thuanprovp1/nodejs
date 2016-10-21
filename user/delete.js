/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function deleteProducts(req, res) {
    var ObjectId = require("mongodb").ObjectId;
    
    console.log(ObjectId(req.query.id));
    
    global.db.collection('user').deleteOne(
        {_id: ObjectId(req.query.id)},
        function (err, doc) {
            if (err)
                res.status(400).json({message: err});
            else
                res.status(201).json({message: "delete success"})
        }
    )
};