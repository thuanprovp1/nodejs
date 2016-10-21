/**
 * Created by Thuan on 10/16/2016.
 */
var product = function () {
    this.setProduct = function (barcode, name, price, category_id, user_id, created_date, modified_date, url_img) {
        this.barcode = barcode;
        this.name = name;
        this.price = price;
        this.category_id = category_id;
        this.user_id = user_id;
        this.created_date = created_date;
        this.modified_date = modified_date;
        this.url_img = url_img;
    };

    this.getProduct = function () {
        return {
            barcode: this.barcode,
            name: this.name,
            price: this.price,
            category_id: this.category_id,
            user_id: this.user_id,
            created_date: this.created_date,
            modified_date: this.modified_date,
            url_img: this.url_img
        }
    }
};

module.exports = product;