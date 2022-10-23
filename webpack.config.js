module.exports = {
    entry: './index.js',
    resolve: {
        extensions: ['', '.js', '.jsx', '.tsx']
    },
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
    
}
