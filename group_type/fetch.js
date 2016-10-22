/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function fetchGroup(req, res) {
    global.db.collection('group_type').find({}).toArray(function (err, docs) {
        if (err) {
            res.status(400).json({message: err});
        }
        else {
            res.status(200).json({data:docs});
        }
    });
};