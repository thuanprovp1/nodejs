/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createGroup(req, res) {
    var group = require('./group.object');
    var myGroup = new group();

    myGroup.setGroup(
        req.body.group_type_id, req.body.product_id
    );

    console.log(myGroup.getGroup());

    global.db.collection('group').insertOne(
        myGroup.getGroup(),
        function (err, doc) {
            if (err) {
                res.status(400).json({message: err})
            }
            else
                res.status(201).json(doc.ops[0]);
        }
    );
};

