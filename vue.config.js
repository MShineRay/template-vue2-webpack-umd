const camelCase = require('camelcase')
const pkg = require('./package.json')
const componentName = camelCase(pkg.name)

// 命令 build serve
const COMMAND = process.argv[2]

/**
 * 环境变量
 *
 * @returns
 */
function env() {
  return process.env.NODE_ENV || 'development'
}

function isProd() {
  const NODE_ENV = env()
  return NODE_ENV === 'production'
}

module.exports = {
  // publicPath: 'http://cdn.xxx.com/',
  productionSourceMap: false,
  // 非production包含运行时编译器
  transpileDependencies: [/jquery/], //拼写全名jquery并不进行打包
  runtimeCompiler: !isProd(),
  css: { extract: false },
  chainWebpack: config => {
    config.entry('main').add('babel-polyfill')
    // 编译public.html
    if (COMMAND === 'serve') {
      config.plugin('html').tap(args => {
        if (!args[0]) args[0] = {}
        const arg = {
          component: componentName,
        }
        Object.assign(args[0], arg)
        return args
      })
    }

    // 组件名及版本
    config.plugin('define').tap(definitions => {
      const define = {
        COMPONENT_NAME: JSON.stringify(componentName),
        VERSION: JSON.stringify(pkg.version),
      }
      Object.assign(definitions[0], define)
      return definitions
    })

    // 图片内敛
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240000 }))
  },
  configureWebpack: (/*config*/) => {
    if (COMMAND === 'build') {
      return {
        output: {
          // library --name 指定 防止文件名出现下划线、中划线。统一转换为驼峰命名
          library: componentName,
          // filename --filename 指定
          libraryExport: 'default',
        },
      }
    }
  },
}
