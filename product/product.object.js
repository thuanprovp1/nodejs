/**
 * Created by Thuan on 10/16/2016.
 */
var product = function () {
    this.setProduct = function (name, price, phone, img) {
        this.name = name;
        this.price = price;
        this.phone = phone;
        this.img = img;
    };

    this.getProduct = function () {
        return {
            name: this.name,
            price: this.price,
            phone: this.phone,
            img: this.img
        }
    }
};

module.exports = product;