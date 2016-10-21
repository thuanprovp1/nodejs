/**
 * Created by Thuan on 10/16/2016.
 */
var group_type = function () {
    this.setGrouptype = function (barcode) {
        this.barcode = barcode;
    };

    this.getGrouptype = function () {
        return {
            barcode: this.barcode
        }
    }
};

module.exports = group_type;