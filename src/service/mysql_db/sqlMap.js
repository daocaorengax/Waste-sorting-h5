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
    search: 'select * from user_rubbish_info'
  }
}

module.exports = sqlMap;