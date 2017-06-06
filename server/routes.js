/**
 * Created by wubo on 2017/5/30.
 */
var fs = require('fs');
var path = require('path');

module.exports = function (app) {
    // app.use("/users", require('./api/user'));   // 用户操作接口

    // app.use("/auth", require('./auth'));    // 登录认证

    app.use("/", function (req, res) {
        // console.log("第一个请求");
        var tmplFilePath;
        if (process.env.NODE_ENV === "production") {
            tmplFilePath = "../client/src/index.html";
        } else {
            tmplFilePath = "../client/src/index-local.html"
        }
        res.send(fs.readFileSync(path.join(__dirname, tmplFilePath)).toString());
    });
};