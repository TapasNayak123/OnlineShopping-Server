var express = require("express");
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var originsWhitelist = [
    'http://localhost:4200'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
app.use(cors(corsOptions));
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))


var accountRouter = require('./routermodel/account.router');
app.use("/api", accountRouter);

var productRourter = require('./routermodel/product.router');
app.use("/api", productRourter);

mongoose.connect("mongodb://localhost/onlineshopping", () => {
    console.log('Database connected')
})

app.listen(3000, () => {
    console.log('Server started listening on port 3000')
})