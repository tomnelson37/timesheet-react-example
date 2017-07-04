var path = require('path');
var webpack = require('webpack');

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

        proxy: {
            '/api/': 'http://localhost:50078/'
        }
  },
};