/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function deleteProduct(req, res) {
    global.db.collection('product').deleteOne(
        {id:("5809b64bce69047c10e204f2")},
        function (err, doc) {
            if (err)
                res.status(400).json({message: err});
            else{
                console.log(req.param.id);
                res.status(202).json({message: "delete success"});
            }
        }
    )

};