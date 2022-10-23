module.exports = {
    entry: './index.js',
    resolve: {
        extensions: ['', '.js', '.jsx', '.tsx']
    },
    exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/,
        /\.scss$/, //Add this line
    ],
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
    
}
