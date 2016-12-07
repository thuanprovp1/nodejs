require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
require('./config/passport')(passport);

var server = app.listen(process.env.port | 8080, function () {
    var port = server.address().port;
    console.log("app running at port ", port);
});

var opt = {
    user: 'thuanprovp1',
    pass: '123456',
    auth: {
        authdb: 'shop_giay'
    }
};




// mongodb.MongoClient.connect('mongodb://thuanprovp1:123456@ds059306.mlab.com:59306/shop_giay', function (err, database) {
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ds059306.mlab.com:59306/shop_giay', opt, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Database connected");

    require('./product/init').initProductRouter(app);
    require('./group_type/init').initGrouptypeRouter(app);
    require('./category/init').initCategoryRouter(app);
    require('./group/init').initGroupRouter(app);
    require('./role/init').initRoleRouter(app);
    require('./user/init').initUserRouter(app);
    require('./login/init').initLoginRouter(app);
    require('./logout/init').initLoginRouter(app);
});
