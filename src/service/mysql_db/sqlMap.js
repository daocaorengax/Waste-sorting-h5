var sqlMap = {
  user: {
    add: 'insert into user (user_name, user_password) values (?,?)',
    select_name: 'select * from user',
    update: 'update user'
  },
  rubbish:{
    add: 'insert into rubbish (rubbish_name, rubbish_type,rubbish_pic,rubbish_remarks) values (?,?,?,?)',
    search: 'select * from rubbish'
  },
  discard:{
    createLog: 'insert into user_rubbish_info (user_id, rubbish_id,drop_count) values (?,?,?)',
    search: 'select * from user_rubbish_info',
    innerSearch: 'select a.id,a.user_id,a.drop_count,b.rubbish_name,a.rubbish_id,b.rubbish_pic,b.rubbish_type from user_rubbish_info a,rubbish b ',
    allSearch: 'SELECT user_rubbish_info.user_id, rubbish.rubbish_name,rubbish.rubbish_type, rubbish.rubbish_pic,user_search_log.count FROM user_rubbish_info INNER JOIN rubbish ON user_rubbish_info.rubbish_id = rubbish.id ',
    update: 'update user_rubbish_info'
  },
  searchLog:{
    search: 'select * from user_search_log',
    add: 'insert into user_search_log (user_id, rubbish_id) values (?,?)',
    update: 'update user_search_log'
  }
}

module.exports = sqlMap;