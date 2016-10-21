/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createUser(req, res) {
    var user = require('./user.object');
    var myUser = new user();

    myUser.setUser(
        req.body.username,
        req.body.password,
        req.body.role_id
    );

    console.log(myUser.getUser());

    global.db.collection('user').insertOne(
        myUser.getUser(),
        function (err, doc) {
            if (err) {
                res.status(400).json({message: err})
            }
            else
                res.status(201).json(doc.ops[0]);
        }
    );
};

