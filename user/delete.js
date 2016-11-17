/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function deleteProducts(req, res) {
    var User = require('./user.object');

    User.remove({
            _id: req.query.id
        },
        function(err, doc) {
            if (err)
                res.status(400).json({
                    message: err
                });
            else
                res.status(200).json({
                    message: "delete success"
                })
        });
};