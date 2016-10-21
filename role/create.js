/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createRole(req, res) {
    var role = require('./role.object');
    var myRole = new role();

    myRole.setRole(
        req.body.name
    );

    global.db.collection('role').insertOne(
        myRole.getRole(),
        function (err, doc) {
            if (err) {
                res.status(400).json({message: err})
            }
            else
                res.status(201).json(doc.ops[0]);
        }
    );
};

