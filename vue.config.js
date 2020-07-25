module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: false,
    proxy: {
      "/top250api": {
        target: "http://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=250", //设置调用的接口域名和端口
        changeOrigin: true, //是否跨域
        ws: true,
        pathRewrite: {
          "^/top250api": ""
        }
      },
      "/hotMovieApi": {
        target: 'http://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/hotMovieApi": ""
        }
      },
      "/UShotMovieApi": {
        target: 'http://api.douban.com/v2/movie/us_box?apikey=0b2bdeda43b5688921839c8ecb20399b',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/UShotMovieApi": ""
        }
      }
    }
  }
}
