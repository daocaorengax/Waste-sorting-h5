var sqlMap = {
  user: {
    add: 'insert into user (user_name, user_password) values (?,?)',
    select_name: 'select * from user'
  },
  rubbish:{
    add: 'insert into rubbish (rubbish_name, rubbish_type,rubbish_pic,rubbish_remarks) values (?,?,?,?)',
    search: 'select * from rubbish'
  },
  discard:{
    createLog: 'insert into user_rubbish_info (user_id, rubbish_id) values (?,?)',
    search: 'select * from user_rubbish_info',
    innerSearch: 'select user_id,b.rubbish_name,b.rubbish_pic,b.rubbish_type from user_rubbish_info a,rubbish b '
  },
  searchLog:{
    search: 'select * from user_search_log',
    add: 'insert into user_search_log (user_id, rubbish_id) values (?,?)',
    update: 'update user_search_log'
  }
}

module.exports = sqlMap;