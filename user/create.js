/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function createUsers(req, res) {
    
    var errorHandler = function(status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };
    try {
        var User = require('./user.object');
        var Role = require('../role/role.object');
        var validateObjectExist = require('../utils/validateObjectExist');
        var validatePropertyObject = require('../utils/validatePropertyObject');


        var createUser = function() {
            var user = new User({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            });

            user.save(function(err, doc) {
                if (err) {
                    errorHandler(400, err);
                }
                else {
                    res.status(201).json(doc);
                }
            });
        };
        Promise.all([
                validatePropertyObject.call(null, req.body, ['username','password','role']),
                validateObjectExist.call(null, Role, req.body.role)
            ])
            .then(createUser)
            .catch(function(err) {
                errorHandler(err.status, err.message);
            });
    }   
    catch (ex) {
        console.log('create product: ' + ex.toString() + ' inline: ' + ex.stack);
        errorHandler(500, ex);
    }
};