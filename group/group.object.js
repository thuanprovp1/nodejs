/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require('mongoose');
var groupSchema = mongoose.Schema({
    grouptype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupType'
    },
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Group', groupSchema);