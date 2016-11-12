/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require('mongoose');
var groupTypeSchema = mongoose.Schema({
        code: String
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('GroupType', groupTypeSchema);