/**
 * @property {String} label - 标签名称
 * @property {String} label - js 插件的包名称
 * @property {String} scope - js 插件的暴露给window的名称
 * @property {String} props - 标签属性
 * @property {String} content - 标签内部内容
 * */

const isProduction = process.env.NODE_ENV === 'production'
const externalsData = [
  {
    label: 'link',
    name: '',
    scope: '',
    props: { href: 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/npm/normalize.css@8.0.1/normalize.min.css' },
    content: ''
  },
  {
    label: 'script',
    name: 'axios',
    scope: 'axios',
    props: { src: 'https://cdn.static.jingyingbang.com/web/libs/axios/0.21.1/axios.min.js' },
    content: ''
  },
  {
    label: 'script',
    name: 'vue',
    scope: 'Vue',
    props: { src: isProduction ? 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vue/runtime/2.6.11/vue.runtime.min.js' : 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vue/runtime/2.6.11/vue.runtime.js' },
    content: ''
  },
  {
    label: 'script',
    name: 'vue-router',
    scope: 'VueRouter',
    props: { src: isProduction ? 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vue-router/3.2.0/vue-router.min.js' : 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vue-router/3.2.0/vue-router.js' },
    content: ''
  },
  {
    label: 'script',
    name: 'vuex',
    scope: 'Vuex',
    props: { src: isProduction ? 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vuex/3.4.0/vuex.min.js' : 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vuex/3.4.0/vuex.js' },
    content: ''
  },
  {
    label: 'script',
    name: 'js-cookie',
    scope: 'Cookies',
    props: { src: isProduction ? 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/js-cookie/3.0.0/js.cookie.min.js' : 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/js-cookie/3.0.0/js.cookie.js' },
    content: ''
  },
  // 无法自定义主题颜色
  {
    label: 'script',
    name: 'vant',
    scope: 'vant',
    props: { src: isProduction ? 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vant/2.12/vant.min.js' : 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/vant/2.12/vant.js' },
    content: ''
  },
  {
    label: 'link',
    name: '',
    scope: '',
    props: { href: 'https://cdn.static.jingyingbang.com/web/libs/vant/2.12/index.css' },
    content: ''
  },
  {
    label: 'script',
    name: 'dayjs',
    scope: 'dayjs',
    props: { src: 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/ajax/dayjs/1.10.4/dayjs.min.js' },
    content: ''
  },
  {
    label: 'script',
    name: 'amfe-flexible',
    scope: '',
    props: { src: 'https://acc-static.oss-cn-hangzhou.aliyuncs.com/web/libs/amfe-flexible/2.2.1/index.min.js' },
    content: ''
  },
  {
    label: 'script',
    name: 'await-to-js',
    scope: 'awaitToJs',
    props: { src: 'https://cdn.static.jingyingbang.com/web/libs/vue/await-to-js.umd.min.js' },
    content: ''
  }
]

module.exports.externalsData = externalsData


// 其他的external
const otherExternalsData = {

}

// 获取configureWebpack -> config.externals 配置
exports.getExternalModules = () => {
  const externals = {} // 结果
  externalsData.forEach(item => {
    // 遍历配置
    if (item.name && item.scope) {
      externals[item.name] = item.scope
    }
  })
  return { ...externals, ...otherExternalsData }
}
