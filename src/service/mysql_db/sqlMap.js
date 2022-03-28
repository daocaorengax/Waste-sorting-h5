var sqlMap = {
  user: {
      add: 'insert into user (user_name, user_password) values (?,?)',
      select_name: 'select * from user'
  }
}

module.exports = sqlMap;