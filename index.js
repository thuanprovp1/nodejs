require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var server = app.listen(process.env.port | 8080, function () {
    var port = server.address().port;
    console.log("app running at", port);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongodb.MongoClient.connect('mongodb://thuanprovp1:123456@ds059306.mlab.com:59306/shop_giay', function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Database connected");
    global.db = database;

    require('./product/init').initProductRouter(app);
    require('./group_type/init').initGrouptypeRouter(app);
    require('./category/init').initCategoryRouter(app);
    require('./group/init').initGroupRouter(app);
    require('./role/init').initRoleRouter(app);
    require('./user/init').initUserRouter(app);
});
