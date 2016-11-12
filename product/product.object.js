/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
        code: String,
        name: String,
        price: Number,
        category: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Category'
        },
        user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User'
        }
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);