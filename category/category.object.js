/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require("mongoose");

var CategorySchema = mongoose.Schema({
        code: String,
        name: String
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Category', CategorySchema);