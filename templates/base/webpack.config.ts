import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
export default {
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'street.game.build.js',
        path: path.resolve(__dirname, 'public'),
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: `${path.resolve(__dirname, 'public')}/index.html`,
        }),
    ],
};
