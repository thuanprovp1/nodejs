/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createGrouptype(req, res) {
    var group_type = require('./group_type.object');
    var myGrouptype = new group_type();

    myGrouptype.setGrouptype(
        req.body.barcode, req.body.name
    );

    console.log(myGrouptype.getGrouptype());

    global.db.collection('group_type').insertOne(
        myGrouptype.getGrouptype(),
        function (err, doc) {
            if (err) {
                res.status(400).json({message: err})
            }
            else
                res.status(201).json(doc.ops[0]);
        }
    );
};
