/**
 * Created by Thuan on 10/15/2016.
 */
exports.initUserRouter = function initUserRouter(app) {
    app.get('/user/fetch', require('./fetch'));
    app.post('/user/create', require('./create'));
    app.post('/user/update', require('./update'));
    app.get('/user/delete', require('./delete'));               // khong can khai báo :id
};