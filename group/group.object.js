/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require('mongoose');
var groupSchema = mongoose.Schema({
        groupType: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'GroupType'
        },
        product:{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Product'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Group', groupSchema);