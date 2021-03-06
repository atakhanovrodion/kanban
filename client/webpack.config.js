/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	target: 'web',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js)$/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
	devServer: {
		port: 8080,
		hot: true,
		/*	proxy: {
			'/websocket': {
				target: 'ws://localhost:8080',
				ws: true,
			},
		},*/
	},
};
