/**
 * Created by Thuan on 10/15/2016.
 */
exports.initCategoryRouter = function initCategoryRouter(app) {
    app.get('/category/fetch', require('./fetch'));
    app.post('/category/create', require('./create'));
    app.post('/category/update/:id', require('./update'));
    app.get('/category/delete/:id', require('./delete'));
};