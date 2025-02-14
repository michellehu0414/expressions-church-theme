const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: "./src/js/main.js",
        home: "./src/pages/home/index.js",
        leadership: "./src/pages/leadership/index.js",
        "elementor-widgets-styles": "./src/scss/elementor-widgets-styles.scss",
    },
    output: {
        filename: 'js/[name].[contenthash].bundle.js', // Add content hash for cache busting
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        alias: {
            // General Paths
            "@src": path.resolve(__dirname, "src"),

            // SCSS Aliases
            "@scss": path.resolve(__dirname, "src/scss"),
            "@abstracts": path.resolve(__dirname, "src/scss/abstracts"),
            "@base": path.resolve(__dirname, "src/scss/base"),
            "@utilities": path.resolve(__dirname, "src/scss/utilities"),
            "@widgets": path.resolve(__dirname, "src/scss/elementor-widgets"),
            "@fonts": path.resolve(__dirname, "src/assets/fonts"),

            // JavaScript Aliases
            "@js": path.resolve(__dirname, "src/js"),
            "@components": path.resolve(__dirname, "src/components"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('cssnano')({
                                        preset: 'default',
                                    }),
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.resolve(__dirname, "src/scss"),
                                    path.resolve(__dirname, "src/scss/abstracts"),
                                    path.resolve(__dirname, "src/scss/base"),
                                    path.resolve(__dirname, "src/scss/components"),
                                    path.resolve(__dirname, "src/scss/pages"),
                                    path.resolve(__dirname, "src/scss/utilities"),
                                    path.resolve(__dirname, "src/scss/elementor-widgets"),
                                ]
                            }
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    drop_console: true, // Remove console logs in production
                },
            },
        })],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(), // Clean the output directory before each build
        new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].min.css' }), // Add content hash for cache busting
    ],
    devtool: 'source-map', // Enable source maps in production
    cache: {
        type: 'filesystem', // Enable filesystem caching
        buildDependencies: {
            config: [__filename], // Cache invalidation based on config file changes
        },
    },
};