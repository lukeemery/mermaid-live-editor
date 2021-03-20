const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const renderUrl = process.env.RENDER_URL || `https://mermaid.ink`;

module.exports = {
  entry: {
    bundle: ['./src/main.js'],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
      '@mermaid': 'mermaid',
      //  "@mermaid": '@mermaid-js/mermaid'
    },
    extensions: ['.mjs', '.js', '.svelte', '.ttf'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: __dirname + '/docs',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            dev: !prod,
            emitCss: true,
            hotReload: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new MonacoWebpackPlugin({
      languages: ['json'],
      features: ['!referenceSearch'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/inject.template.js' }],
    }),
  ],
  externals: {
    config: JSON.stringify({
      renderUrl: renderUrl,
    }),
  },
  devtool: prod ? false : 'source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    watchOptions: {
      poll: true, // Or you can set a value in milliseconds.
    },
  },
};
