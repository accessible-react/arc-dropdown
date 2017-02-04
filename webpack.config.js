var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, 'src');
var devPath = path.join(__dirname, 'playground');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DEVELOPMENT = process.env.NODE_ENV === 'development';


var config = {
  entry :  {
    bundle :  [],
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js', //
    path: path.join(assetsPath,'../' ,"dist/"),
    publicPath: 'http://localhost:8080/'
  },
  module: {
    rules: [
      {
        //tell webpack to use jsx-loader for all *.jsx files
        test: /.jsx?$/,
        use: ['babel-loader'],
        exclude:/node_modules/
      },{
        test : /.scss$/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules : [
      path.resolve(assetsPath),
      path.resolve(__dirname,'node_modules')
    ]
  },
  devtool : '#source-map',
  plugins: [
  ]
};




if(DEVELOPMENT){
  //push webpack devserver
  config.entry.bundle.push(
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server'
  );
  config.resolve.modules.push(devPath);
  config.module.rules[1].use = ['style-loader','css-loader','sass-loader'];

  //config.module.rules[0].use.unshift('react-hot-loader/webpack');


  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'arc-dropdown',
      template : path.resolve(devPath,'template.html'),
      filename : 'index.html',
      inject : true
    })
  );
  config.entry.bundle.push(path.resolve(devPath,'main.js'));

} else {
    config.module.rules[1].use = ['style-loader','css-loader','sass-loader'];

    // ExtractTextWebpackPlugin.extract({
    //   fallbackLoader: "style-loader",
    //   loader: "css-loader!sass-loader"
    // });
  config.externals= {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  };
  config.plugins.push(
    //new ExtractTextWebpackPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
  config.entry.bundle.push(path.resolve(assetsPath,'index.js'));

}
//Push entry always


module.exports = config;
