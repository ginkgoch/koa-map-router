const path = require('path');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.ts'),
  watch: false,
  target: "node",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    libraryTarget: "umd"
  },
  module: {
    rules: [{
      test: /.tsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'tests'),
      ],
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts']
  },
  externals: {
    "lodash": {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_"
    },
    ...getExternals(),
  },
  devtool: 'source-map'
};

function getExternals() {
  let modules = ['koa', 'koa-body', 'koa-router', 'canvas', 'jsts', 'csv-parse', 'proj4',
    'ginkgoch-map', 'ginkgoch-geom', 'ginkgoch-buffer-io', 'ginkgoch-filestream', 'ginkgoch-shapefile', 'ginkgoch-map/native/node'];
  let externals = { };
  modules.forEach(m => { 
    externals[m] = {
      commonjs: m,
      commonjs2: m,
      amd: m,
      root: m
    }
  });

  return externals;
}