new webpack.DefinePlugin({
  'process.env':{
    'NODE_ENV': JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin({
  minimize: 'production',
  mangle: 'production',
  comments: 'development',
  compress: 'production', {
     warnings:false
  },
  sourcemap: 'development'
})
