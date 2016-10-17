/**
 * Created by Thuan on 10/15/2016.
 */
exports.initProductRouter = function initProductRouter(app, db) {
    app.get('/product/fetch', require('./fetch')(db));
    app.post('/product/create', require('./create')(db));
    app.post('/product/update', require('./update')(db));
    app.get('/product/delete/:id', require('./delete')(db));
};