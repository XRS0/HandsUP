const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/app/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Главный алиас
      '@views': path.resolve(__dirname, 'src/views'),
      '@assets': path.resolve(__dirname, 'src/shared/assets'),
    },
    extensions: ['.js', '.ts', '.tsx']
    // fallback: {
    //   "process": require.resolve("process/browser")
    // }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.svg$/i,
        oneOf: [
          // Для импорта как React-компонента (?react)
          {
            resourceQuery: /react/,
            use: ['@svgr/webpack']
          },
          // Для всех остальных SVG (img src, CSS)
          {
            type: 'asset/resource',
            generator: {
              filename: 'assets/images/[name].[hash][ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Убрали svg из этого правила
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new Dotenv(),
  ]
}