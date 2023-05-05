const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv-webpack');

module.exports =[{
  mode: 'production',
  devtool: 'source-map',
  cache: true,
  optimization: {
    minimizer: [new TerserPlugin({})],
  },
  performance: {
    hints: false
  },
  entry: './src/index.tsx',  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },  
  resolve:{
    extensions: [".js",".ts",".tsx", ".jsx"] 
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use:'ts-loader',
      },
       {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use:{
           loader: 'babel-loader',
           options: {
            presets: ["@babel/preset-env", "@babel/preset-react" , "@babel/preset-typescript"]
           }
        },
      },
      {
        test:  /\.css$/,        
        use:['style-loader' ,"css-loader", "sass-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)?$/,
        exclude: /node_modules/,
        use:'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new dotenv({
      path: path.resolve(__dirname, `./.env`),
      systemvars: true
    }),
    new TerserPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
  stats: 'errors-only',
}];