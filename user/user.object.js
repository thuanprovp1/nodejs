/**
 * Created by Thuan on 10/16/2016.
 */
var user = function () {
    this.setUser = function (username, password, role_id) {
        this.username = username;
        this.password = password;
        this.role_id = role_id;
    };

    this.getUser = function () {
        return {
            username: this.username,
            password: this.password,
            role_id: this.role_id
        }
    }
};

module.exports = user;