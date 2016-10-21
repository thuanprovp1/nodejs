/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createCategory(req, res) {
    var category = require('./category.object');
    var myCategory = new category();

    myCategory.setcategory(
        req.body.barcode, req.body.name
    );

    console.log(myCategory.getcategory());

    global.db.collection('category').insertOne(
        myCategory.getcategory(),
        function (err, doc) {
            if (err) {
                res.status(400).json({message: err})
            }
            else
                res.status(201).json(doc.ops[0]);
        }
    );
};

