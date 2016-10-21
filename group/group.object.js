/**
 * Created by Thuan on 10/16/2016.
 */
var group = function () {
    this.setGroup = function (group_type_id, product_id) {
        this.group_type_id = group_type_id;
        this.product_id = product_id;
    };

    this.getGroup = function () {
        return {
            group_type_id: this.group_type_id,
            product_id: this.product_id
        }
    }
};

module.exports = group;