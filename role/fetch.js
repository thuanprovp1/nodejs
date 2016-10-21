/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function fetchProduct(req, res) {
    global.db.collection('role').find({}).toArray(function (err, docs) {
        if (err) {
            res.status(400).json({message: err});
        }
        else {
            res.status(200).json(docs);
        }
    });
};