const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  //const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['@babel/polyfill','./src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env','@babel/preset-react']
          }
      }
      }, {
        test: /\.s?css$/,
        //use: CSSExtract.extract({
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
             
            }, 
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        //})
      }]
    },
    plugins: [
      //CSSExtract
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};





// const path = require('path')

// module.exports={
//     entry :['@babel/polyfill','./src/app.js'],
//     output:{
//         path: path.join(__dirname,'public'),
//         filename :'bundle.js'   
//     },
//   module : {
//       rules : [{
//         loader : 'babel-loader',
//         test : /\.js$/,
//         exclude : /node_modules/
//       }, {
//         test : /\.s?css$/,
//         use : [
//           'style-loader',
//           'css-loader',
//           'sass-loader'
//         ]
//       }]
//   }, 
//   devtool : 'cheap-module-eval-source-map' ,
//   devServer : {
//     contentBase :  path.join(__dirname,'public'),
//     historyApiFallback : true
//   }
// }
