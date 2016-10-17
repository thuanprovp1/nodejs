/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function updateProduct(db) {
    var router = require('express').Router();

    router.post('/product/update', function (req, res) {
        var updateDoc = req.body;
        delete updateDoc._id;

        db.collection('products').updateOne(
            {id: (req.param.id)}, {
                $set: updateDoc,
                $currentDate: {"lastModified": true}
            },
            function (err, doc) {
                if (err)
                    res.status(400).json({message: err});
                else
                    res.status(201).json({message: "delete success"})
            }
        )
    });
    return router;
};