/* eslint no-console:  0, quote-props: 0*/
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV !== 'production';
const analyzeBundle = process.env.ANALYZE_BUNDLE;
// console.log(`Starting Webpack (devmode: ${devMode})`);

let devtool;
if (devMode) {
  devtool = 'eval-source-map';
} else {
  devtool = 'nosources-source-map';
}

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [require('babel-preset-env'), {
        targets: {
          browsers: devMode ?
            ['last 1 Chrome versions', 'last 1 Firefox versions'] :
            ['last 2 versions', 'safari >= 7', 'not ie < 11']
        },
        modules: false, // keeping the esm module syntax enables the minifier to go through the modules
        loose: true,
        debug: !devMode // log targets when creating dist
      }],
      require('babel-preset-react'),
    ],
    plugins: [
      require('babel-plugin-transform-object-rest-spread'), // transpile spread operator for objects
      require('babel-plugin-transform-class-properties'), // transpile class properties
      require('babel-plugin-transform-es2015-classes'), // react-hot-loader always needs this, see: https://github.com/gaearon/react-hot-loader/issues/313
      require('babel-plugin-syntax-dynamic-import'), // enable dynamic imports (lazy loading)
      require('babel-plugin-transform-runtime'),
      ...(devMode ? [
        require('react-hot-loader/babel')
      ] : [
        // require('babel-plugin-ramda'), // improve dead code elimination for ramda
        require('babel-plugin-lodash'), // improve dead code elimination for lodash
        [require('babel-plugin-transform-imports'), {
          // improve dead code elimination for material-ui
          'material-ui': { transform: 'material-ui/${member}', preventFullImport: true }
        }]
      ])
    ],
    babelrc: false
  }
};

const cssModuleLoader = {
  loader: 'css-loader',
  query: {
    modules: true,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }
};

const workerLoader = {
  loader: 'worker-loader',
  options: {
    inline: false, // sepererate files will still be created as fallback
    name: '[name].worker.js'
  }
};

const imgLoader = [{
  loader: 'file-loader',
  options: { name: '[path][name].[ext]' }
}];

if (!devMode) {
  const imageCompressor = {
    loader: 'image-webpack-loader',
    options: {
      mozjpeg: { progressive: true, quality: 65 },
      optipng: { enabled: false },
      pngquant: { quality: '65-90', speed: 4 }
    }
  };

  imgLoader.push(imageCompressor);
}

module.exports = {
  entry: {
    app: [
      ...(devMode ? [
        'webpack-hot-middleware/client?reload=true', // hot middleware client
        'react-hot-loader/patch'
      ] : []),
      './src/js/preloader.js'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'PLATFORM': JSON.stringify(process.env.PLATFORM),
      }
    }),
    ...(analyzeBundle ? [new BundleAnalyzerPlugin()] : [
      new HTMLWebpackPlugin({
        template: require('html-webpack-template'),
        filename: 'index.html',
        title: 'Doodle3D Transform',
        appMountId: 'app',
        inject: false,
        mobile: true,
        minify: !devMode && { html5: true, collapseWhitespace: true },
        hash: !devMode,
        favicon: 'favicon.ico',
        chunks: ['app'],
        meta: [
          { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
          { name: 'mobile-web-app-capable', content: 'yes' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, minimal-ui, user-scalable=no' }
        ]
      }),
      new HTMLWebpackPlugin({
        template: require('html-webpack-template'),
        filename: '404.html',
        title: 'Page not found',
        inject: false,
        mobile: true,
        bodyHtmlSnippet: 'Not found',
        chunks: []
      })
    ]),
    ...(devMode ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
      // new BundleAnalyzerPlugin()
    ] : [])
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src/'),
      'data': path.resolve(__dirname, 'data/'),
      'img': path.resolve(__dirname, 'img/'),
      'workers': path.resolve(__dirname, 'workers/'),
      'server': path.resolve(__dirname, 'server/'),
      'CHANGELOG.md': path.resolve(__dirname, 'CHANGELOG.md')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [babelLoader]
      }, {
        test: /\.css$/,
        exclude: /src\/css\/.+\.css$/,
        use: ['style-loader', 'css-loader']
        }, { // css modules
        test: /src\/css\/.+\.css$/,
        use: ['style-loader', cssModuleLoader]
      }, {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: imgLoader
      }, {
        test: /\.(woff)$/,
        use: {
          loader: 'file-loader'
        }
      }, {
        test: /\.(svg|glsl|txt|md)$/,
        use: 'raw-loader'
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }, {
        test: /\.yml$/,
        use: 'yml-loader'
      }, { // web workers
        test: /\.worker.js$/,
        use: [workerLoader, babelLoader]
      }, { // make THREE global available to three.js examples
        test: /three\/examples\/.+\.js/,
        use: 'imports-loader?THREE=three'
      }
    ]
  },
  // Source map creation
  // https://webpack.js.org/configuration/devtool/
  devtool
};
