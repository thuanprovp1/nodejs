/**
 * Created by Thuan on 10/15/2016.
 */
    
    // global.db.collection('user').find({}).toArray(function (err, docs) {
    //     if (err) {
    //         res.status(400).json({message: err});
    //     }
    //     else {
    //         res.status(200).json({data: docs});
    //     }
    // });
    module.exports = function fetchListProducts(req, res) {
        var User = require('./user.object');
        var Role = require('../role/role.object');
        User.find({})
            .populate('roles')
            .exec(function(err, docs) {
                if (err) {
                    res.status(400).json({
                        message: err
                    });
                }
                else {
                    res.status(200).json({"data": docs});
                }
            });
    };