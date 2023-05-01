const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const IS_PRODUCTION = argv.mode === 'production';

  const config = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    devtool: IS_PRODUCTION ? 'source-map' : 'inline-source-map',

    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    resolve: {
      alias: {
        '@fonts': path.join(__dirname, 'src/fonts/inter/'),
      },
    },

    plugins: [
      new Dotenv(),

      new HtmlBundlerPlugin({
        entry: {
          index: 'src/index.html',
        },

        js: {
          filename: '[name].[contenthash:8].js',
        },

        css: {
          filename: '[name].[contenthash:8].css',
        },

        preload: [
          {
            test: /\.woff2?$/,
            attributes: { as: 'font', crossorigin: true },
          },
        ],

        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
      }),
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: ['source-map-loader'],
        },
        {
          test: /\.(css|sass|scss)$/,
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(woff|woff2)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext][query]',
          },
        },
        {
          test: /\.(ico|svg|png|webp|avif|jpg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash:8][ext][query]',
          },
        },
      ],
    },

    optimization: {
      minimize: IS_PRODUCTION,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.esbuildMinify,
          extractComments: false,
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },

    performance: {
      hints: false,
    },
  };

  if (!IS_PRODUCTION) {
    config.devServer = {
      compress: true,
      port: 8000,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      // watchFiles: {
      //   paths: ['src/**/*.*'],
      //   options: {
      //     usePolling: true,
      //   },
      // },
    };
  }

  return config;
};
