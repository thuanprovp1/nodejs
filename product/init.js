/**
 * Created by Thuan on 10/15/2016.
 */
exports.initProductRouter = function initProductRouter(app) {
    app.get('/product/fetch', require('./fetch'));
    app.post('/product/create', require('./create'));
    app.post('/product/update/:id', require('./update'));
    app.get('/product/delete/:id', require('./delete'));
};