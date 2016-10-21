/**
 * Created by Thuan on 10/16/2016.
 */
var role = function () {
    this.setRole = function (name) {
        this.name = name
    };

    this.getRole = function () {
        return {
            name: this.name
        }
    }
};

module.exports = role;