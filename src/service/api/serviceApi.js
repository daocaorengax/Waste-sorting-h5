var models = require('../mysql_db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../mysql_db/sqlMap');
var conn = mysql.createConnection(models.mysql)

conn.connect()

jsonWrite = function (res,ret){
  if(typeof ret === 'undefined'){
    res.send('err')
  } else {
    console.log(ret);
    res.send(ret)
  }
}

// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.userName, params.password], function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});


//查找用户接口
router.post('/login', (req, res) => {
  var sql_name = $sql.user.select_name;
  // var sql_password = $sql.user.select_password;
  var params = req.body;
  if (params.name) {
      sql_name += " where user_name ='"+ params.name +"'";
      console.log(sql_name);
  }    
  conn.query(sql_name, params.name, function(err, result) {
      if (err) {
          console.log(err);
      }
      // console.log(result);
      if (result[0] === undefined) {
          res.send('-1')   //查询不出username，data 返回-1
      } else {
          var resultArray = result[0];
          console.log(resultArray);
          console.log(params);
          if(resultArray.password === params.password) {
              jsonWrite(res, result);
          } else {
              res.send('0')   //username
          }
      }
  })
});

//获取用户信息
router.get('/getUser', (req, res) => {
  var sql_name = $sql.user.select_name;
  // var sql_password = $sql.user.select_password;
  var params = req.query;
  console.log(params);
  if (params.name) {
      sql_name += "where user_name ='"+ params.name +"'";
  }
  conn.query(sql_name, params.name, function(err, result) {
      if (err) {
          console.log(err);
      }
      // console.log(result);
      if (result[0] === undefined) {
          res.send('-1')   //查询不出username，data 返回-1
      } else {
          jsonWrite(res, result);
      }
  })
});

//创建垃圾信息
router.post('/createRub', (req, res) => {
    var sql = $sql.rubbish.add;
    var params = req.body;
    conn.query(sql, [params.name, params.type,params.pic,params.remarks], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
  });
  
  
  //搜索垃圾(支持模糊查询)
  router.post('/searchRub', (req, res) => {
    var sql_name = $sql.rubbish.search;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    if (params.name) {
        sql_name += " where rubbish_name like'"+ params.name +"%'";
        console.log(sql_name);
    }    
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不到则data 返回-1
        } else {
            var resultArray = result[0];
            console.log(resultArray);
            console.log(params);
            if(resultArray.password === params.password) {
                jsonWrite(res, result);
            } else {
                res.send('0')   //username
            }
        }
    })
  });

  //记录用户丢弃垃圾历史记录
  router.post('/userDiscardLog', (req, res) => {
    var sql = $sql.discard.createLog;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.userId, params.rubbishId], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
  });
  


module.exports = router;