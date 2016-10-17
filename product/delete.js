/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function deleteProduct(db) {
    var router = require('express').Router();

    router.get('/product/delete/:id', function (req, res) {
        db.collection('products').deleteOne(
            {id: (req.param.id)},
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