module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('svg')
  },
  
  css: {
    // extract CSS in components into a single CSS file (only in production)
    extract: true,

    // enable CSS source maps?
    sourceMap: true
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/, 
          loader: 'vue-svg-loader', 
        },
      ]
    },     
    devtool: 'sourceMap'
  }
}
