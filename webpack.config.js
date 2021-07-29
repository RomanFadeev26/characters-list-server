const path = require('path');

module.exports = {
	mode: process.env.WEBPACK_MODE,
	entry: './dist/src/client/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public')
	}
};
