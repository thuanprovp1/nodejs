/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createProduct(req, res) {
    var product = require('./product.object');
    var myProduct = new product();

    myProduct.setProduct(
        req.body.barcode, req.body.name,
        req.body.price, req.body.category_id,
        req.body.user_id, req.body.created_date,
        req.body.modified_date, req.body.url_img
    );

    console.log(myProduct.getProduct());

    global.db.collection('product').insertOne(
        myProduct.getProduct(),
        function (err, doc) {
            if (err) {
                res.status(400).json({message: err})
            }
            else
                res.status(201).json(doc.ops[0]);
        }
    );
};

