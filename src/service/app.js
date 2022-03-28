//Express 服务开启方式  node app
const userApi = require('./api/userApi')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userApi);

app.listen(3000);
console.log('success listen at port: 3000')