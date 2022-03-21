# Waste-sorting-h5
# 垃圾分类h5-首页

## Project setup
```
npm install
```

### 开发环境运行
```
npm run serve
```
### 生产环境运行
```
npm run serve:prod
```
### 预发环境打包
```
npm run build:pre
```
### 预生产环境打包
环境变量为生产的，但是允许打印
```
npm run build:alpha
```
### 测试环境打包
```
npm run build:test
```
### 打包分析
```
npm run build:analyz
```
### 生产打包
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 代码风格
1. 页面名称、router path 使用**横线连接 (kebab-case)**

## 规范

### css
项目通用全局css 命名空间：`am`

本项目全局css 命名空间： `co`

全局scss 变量命名空间：`$co`

### cookie
cookie 名称已下划线分割。

项目通用cookie 名称命名空间：`co`

本项目cookie 名称命名空间： `` 待定。想起来再写。

### 开发
在 `/src/components/base-components/` 下的`Base` 开头的组件 都会被自动引入为全局组件。例如`/src/components/base-components/BaseBtn2.vue`

在`/filters/index` 的过滤器 会被注册为全局过滤器

## 插件
[dayjs](https://dayjs.gitee.io/zh-CN) / [dayjs 中文](https://dayjs.fenxianglu.cn/category/) - 日期格式化。

[js-cookie](https://github.com/js-cookie/js-cookie) - cookie

lodash [中文网站](https://www.lodashjs.com/) [官网](https://lodash.com/)

[callapp-lib](https://github.com/suanmei/callapp-lib) - H5唤起客户端

[await-to-js](https://github.com/scopsy/await-to-js) - 异步等待包装，无需try-catch即可轻松处理错误

[vant](https://vant-contrib.gitee.io/vant/#/zh-CN/) - vant ui

## 常见问题



## 兼容
todo

## TODO

