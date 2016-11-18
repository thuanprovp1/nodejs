/**
 * Created by Thuan on 10/15/2016.
 */
module.exports = function updateRole(req, res) {
    var errorHandler = function(status, message) {
        res.status(status).json({
            message: message.toString()
        });
    };

    try {
        var Role = require('./role.object');
        var validatePropertyObject = require('../utils/validatePropertyObject');

        Role.findById(req.body.id, function(err, response) {
            if (response) {
                validatePropertyObject(req.body, ['name'])
                    .then(createRole.bind(null, response), errorHandler.bind(null, 400));
            }
            else {
                res.status(400).json({message: "Role not exist"});
            }
        });

        var createRole = function(role) {
            role.name = req.body.name;

            role.save(function(err, doc) {
                if (err) {
                    errorHandler(400, err);
                }
                else {
                    res.status(201).json(doc);
                }
            });
        }
    }
    catch (ex) {
        console.log('create role: ' + ex.toString() + ' inline: ' + ex.stack);
        errorHandler(500, ex);
    }
};