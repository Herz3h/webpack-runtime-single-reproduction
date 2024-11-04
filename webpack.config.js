const path = require('path');
const fs = require('fs');

  module.exports = {
    mode: 'development',
    watch: true,
    entry: {
       homepage: './public/js/homepage.js',
       index: './public/js/index.js',
    },
    plugins: [
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public/js-lib/'),
      clean: true,
      publicPath: 'https://localhost:3001/js-lib/',
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test(module, { chunkGraph, moduleGraph })
            {
              if(!module.resource)
              {
                return false;
              }

              var filename = path.basename(module.resource);
              return module.resource.includes('node_modules') && filename.endsWith('.js');
            },

            name: 'vendor',
            chunks: 'all',
            minChunks: 3,
          },
        }
      }

    },
    module: {
        rules: [
          {
            test: /\.m?js$/, // Matches .js and .mjs files
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
            {
                test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
      alias: {
        jquery: require.resolve('jquery'),
      }
    },
    stats: 'minimal',
    externals: {
        jquery: 'jQuery',
    },
    devServer: {
      port: 3000,
      devMiddleware: {
        publicPath: 'https://localhost:3001/js-lib/',
        stats: 'minimal',
      },
      host: '0.0.0.0',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
      allowedHosts: ['all'],
      server: {
        type: 'spdy',
        options: {
          https: {
            key: fs.readFileSync('./localhost-key.pem'),
            cert: fs.readFileSync('./localhost.pem'),
          },
        },
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: false,
        },
        webSocketURL: {
          protocol: 'wss',
          hostname: 'localhost',
          port: 3000,
          // Optionally, specify pathname if needed
          // pathname: '/ws',
        },
      },
      liveReload: false,
      hot: 'only',
      webSocketServer: 'sockjs'
    },

  };

