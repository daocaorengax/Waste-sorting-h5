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
  conn.query(sql, [params.name, params.password], function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});

// 更新用户接口
router.post('/updateUser', (req, res) => {
    var sql_name = $sql.user.update;
    var params = req.body;
    if (params.id) {
        sql_name += " set user_password = " + params.password + " where id ="+ params.id;
    }    
    conn.query(sql_name, params.userId, function(err, result) {
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
      sql_name += " where user_name ='"+ params.name +"' and user_password ='"+ params.password+"'";
      console.log(sql_name);
  }    
  conn.query(sql_name, params.name, function(err, result) {
      if (err) {
          console.log(err);
      }
      // console.log(result);
      if (result[0] === undefined) {
          res.send({})   //查询不出username，data 返回-1
      } else {
          var resultArray = result[0];
          console.log(resultArray);
          console.log(params);
        //   if(resultArray.password === params.password) {
              jsonWrite(res, resultArray);
        //   } else {
        //       res.send('0')   //username
        //   }
      }
  })
});

//获取用户信息
router.post('/getUser', (req, res) => {
  var sql_name = $sql.user.select_name;
  // var sql_password = $sql.user.select_password;
  var params = req.body;
  console.log(params,'获取用户信息',sql_name,'-sql_name');
  if (params.name) {
      sql_name += " where user_name ='"+ params.name +"'";
  }
  conn.query(sql_name, params.name, function(err, result) {
      if (err) {
          console.log(err);
      }
      // console.log(result);
      if (result[0] === undefined) {
          res.send({})   //查询不出username，data 返回-1
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
        sql_name += " where rubbish_name like'%"+ params.name +"%'";
        console.log(sql_name);
    }    
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send([])   //查询不到则data 返回-1
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
  router.post('/addDiscardLog', (req, res) => {
    var sql = $sql.discard.createLog;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.userId, params.rubbishId,params.count], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
  });

  router.post('/updateDiscardLog', (req, res) => {
    var sql_name = $sql.discard.update;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    if (params.id) {
        sql_name += " set drop_count = " + params.count + " where id ="+ params.id;
    }    
    conn.query(sql_name, params.userId, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
  });
  // SELECT user_name,rubbish_name,rubbish_pic,rubbish_type FROM `user` as a INNER JOIN rubbish as b WHERE a.id = '1' AND b.id = '10000'
  
  //查询用户历史操作
  router.post('/searchRubByUser', (req, res) => {
    var sql_name = $sql.discard.innerSearch;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    if (params.userId) {
        sql_name += "where a.user_id ="+ params.userId +" and b.id = a.rubbish_id and b.rubbish_type ="+ params.type;
        console.log(sql_name);
    }    
    conn.query(sql_name, params.userId, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send([])   //查询不到则data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
})

  //查询用户历史操作 2.0
  router.post('/searchAllRubByUser', (req, res) => {
    var sql_name = $sql.discard.allSearch;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    if (params.userId) {
        sql_name += "and user_rubbish_info.user_id ="+ params.userId +" and rubbish.rubbish_type ="+ params.type+ "  INNER JOIN user_search_log ON user_search_log.rubbish_id = rubbish.id"
        // sql_name += "where user_rubbish_info.user_id ="+ params.userId +" and rubbish.id = user_rubbish_info.rubbish_id and rubbish.rubbish_type ="+ params.type+ " INNER JOIN user_search_log ON user_search_log.rubbish_id = rubbish.id";
        console.log(sql_name);
    }    
    conn.query(sql_name, params.userId, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send([])   //查询不到则data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
})

    //查看用户搜索频率
    router.post('/getSearchLog', (req, res) => {
    var sql_name = $sql.searchLog.search;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    if (params.userId) {
        sql_name += " where user_id ="+ params.userId +" and rubbish_id ="+ params.rubbishId;
    }    
    conn.query(sql_name, params.userId, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send([])   //查询不到则data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
})
    //记录用户搜索次数
    router.post('/addSearchLog', (req, res) => {
        var sql = $sql.searchLog.add;
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
    //更新用户搜索次数
    router.post('/updateSearchLog', (req, res) => {
        var sql_name = $sql.searchLog.update;
        // var sql_password = $sql.user.select_password;
        var params = req.body;
        if (params.id) {
            sql_name += " set count = " + params.count + " where id ="+ params.id;
        }    
        conn.query(sql_name, params.userId, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                jsonWrite(res, result);
            }
        })
    });

module.exports = router