/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
    name : String
});

module.exports = mongoose.model('Role', roleSchema);