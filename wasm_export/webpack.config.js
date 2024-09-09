import path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isPthreads = env.pthreads === 'true';
  const baseInputFolderName = isPthreads ? 'bin_pt' : 'bin';
  const inputFolderName = isProduction ? `${baseInputFolderName}/opt` : `${baseInputFolderName}/dbg`;
  const outputFolderName = isPthreads ? (isProduction ? 'dist/prod_pt' : 'dist/dev_pt') : (isProduction ? 'dist/prod' : 'dist/dev');

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './MyWasm.mjs',
    experiments: {
        outputModule: true
    },
    output: {
      path: path.resolve(__dirname, outputFolderName),
      filename: 'MyWasm.min.js',
      libraryTarget: 'module',
      globalObject: 'this',
    },
    devtool: isProduction ? false : 'inline-source-map',
    resolve: {
      alias: {
        'my.js': path.resolve(__dirname, inputFolderName, 'my.js'),
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.wasm$/,
          type: 'asset/resource',
          generator: {
            filename: 'my.wasm',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, inputFolderName, 'my.wasm'),
            to: "my.wasm"
          },
          {
            from: path.resolve(__dirname, 'package_dist.json'),
            to: "package.json"
          }
        ],
      }),
    ],
  };
};
