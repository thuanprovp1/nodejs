/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function updateProduct(req, res) {

        var updateDoc = req.body;
        delete updateDoc._id;

        global.db.collection('product').updateOne(
            {id: (req.param.id)}, {
                $set: updateDoc,
                $currentDate: {"lastModified": true}
            },
            function (err, doc) {
                if (err)
                    res.status(400).json({message: err});
                else
                    res.status(201).json({message: "update success"})
            }
        )
    };