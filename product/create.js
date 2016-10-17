/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createProduct(db) {
    var router = require('express').Router();
    var product = require('./product.object');

    router.post('/product/create', function (req, res) {
        var myProduct = new product();
        myProduct.setProduct(req.body.name, req.body.price, req.body.phone, req.body.img);

        console.log(myProduct.getProduct());

        db.collection('products').insertOne(
            myProduct.getProduct(),
            function (err, doc) {
                if (err) {
                    res.status(400).json({message: err})
                }
                else
                    res.status(201).json(doc.ops[0]);
            }
        );
    });

    return router;
};