/**
 * Created by apple on 16/10/18.
 */
var express = require('express');
var bodyParser = require('body-parser');//引入
var app = express();//创建实例
var router = express.Router();

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));

//请求时开始使用的方法
router.use(function(req, res, next) {
  next();
});

//请求返回的方法
router.post('/Info', function (req, res) {
  res.send('Got a POST request');
  console.log(req.body);
});

app.use(router);
app.listen(3000); //指定端口并启动express web服务
