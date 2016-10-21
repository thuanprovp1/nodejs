/**
 * Created by Thuan on 10/15/2016.
 */
exports.initGrouptypeRouter = function initGrouptypeRouter(app) {
    app.get('/group-type/fetch', require('./fetch'));
    app.post('/group-type/create', require('./create'));
    app.post('/group-type/update/:id', require('./update'));
    app.get('/group-type/delete/:id', require('./delete'));
};