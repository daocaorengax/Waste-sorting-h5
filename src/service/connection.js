
var express = require('express');   //引入express模块
var mysql = require('mysql');     //引入mysql模块
var app = express();        //创建express的实例

const mysqlConfig = {
  host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
  user: 'root', 
  password: '', // root 密码
  database: 'rubbish_rec', // 数据库名
  port: '3306'
}

const pool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  port: mysqlConfig.port,
  multipleStatements: true    // 多语句查询
});

var setValue = function() {
  pool.getConnection((err, connection) => {
    var sql = 'INSERT INTO user(user_name,user_password) VALUES ("15771968701", "123456")'
    connection.query(sql, (err, result) => {
        console.log(result);
        connection.release();
    })
  })
}

setValue()