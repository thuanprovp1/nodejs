/**
 * Created by Thuan on 10/15/2016.
 */
exports.initRoleRouter = function initRoleRouter(app) {
    app.get('/role/fetch', require('./fetch'));
    app.post('/role/create', require('./create'));
    app.post('/role/update', require('./update'));
    app.get('/role/delete', require('./delete'));
};