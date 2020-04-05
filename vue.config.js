module.exports = {
  lintOnSave: false,
  runtimeCompiler: true, // runtime 方法初始化vue，需配置该项
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
}
