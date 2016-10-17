/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function fetchProduct(db) {
    var router = require('express').Router();

    router.get('/product/fetch', function (req, res) {
        // var db = process.env.db;
        db.collection('products').find({}).toArray(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json(docs);
            }
        });
    });
    return router;
};

