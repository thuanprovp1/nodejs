/**
 * Created by PC on 10/16/2016.
 */
var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
        name: String,
        code: String,
        price: Number,
        url: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    ,
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', ProductSchema);