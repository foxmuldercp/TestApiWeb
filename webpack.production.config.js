new webpack.DefinePlugin({
  'process.env':{
    'NODE_ENV': 'production'
  }
}),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  mangle: true,
  comments: false,
  compress: true, //'production', {
//    warnings: false,
//    screw_ie8: true
//  },
  sourcemap: false
})
