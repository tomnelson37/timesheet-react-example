var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack')

module.exports = {
    entry: './src/index.jsx',
    devtool: 'source-map',
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    target: 'web',
    context: __dirname,
    module: {
        rules: [
            {
                test:  /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "react"]
                    }
                }           
            }
        ]
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: "./dist",
        noInfo: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: '8081',
        // proxy requests to /services to our web api running at localhost:5000
        proxy: {
            '/services': 'http://localhost:5000'
        }
  },
}