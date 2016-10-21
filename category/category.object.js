/**
 * Created by Thuan on 10/16/2016.
 */
var category = function () {
    this.setcategory = function (barcode, name) {
        this.barcode = barcode;
        this.name = name;
    };

    this.getcategory = function () {
        return {
            barcode: this.barcode,
            name: this.name
        }
    }
};

module.exports = category;