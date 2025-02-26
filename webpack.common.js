const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
// const htmlPages = [
//     { template: 'index.html', chunks: ['index'], filename: 'index.html' },
//     { template: 'leadership.html', chunks: ['leadership'], filename: 'leadership.html' },
// ]

module.exports = {
    entry: {
        index: "./src/pages/index/index.jsx",
        leadership: "./src/pages/leadership/index.jsx",
        main: "./src/main.jsx",
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@scss": path.resolve(__dirname, "src/scss"),
            "@abstracts": path.resolve(__dirname, "src/scss/abstracts"),
            "@base": path.resolve(__dirname, "src/scss/base"),
            "@utilities": path.resolve(__dirname, "src/scss/utilities"),
            "@widgets": path.resolve(__dirname, "src/scss/elementorWidgets"),
            "@fonts": path.resolve(__dirname, "src/assets/fonts"),
            "@js": path.resolve(__dirname, "src/js"),
            "@components": path.resolve(__dirname, "src/components"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@data": path.resolve(__dirname, "src/data"),
        },
        extensions: [".js", ".jsx"],
    },

    module: {
        rules: [
            {
                test: /\.(woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][ext]",
                },
            },
            {
                test: /\.module\.scss$/, // CSS Modules (Scoped Styles)
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]--[hash:base64:5]", // Unique class names
                            },
                        },
                    },
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, "src/scss")], // ✅ Allows SCSS to use aliases
                                outputStyle: "expanded",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/, // Global Styles (Not Scoped)
                exclude: /\.module\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS as separate files
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, "src/scss")], // ✅ Allows SCSS to use aliases
                                outputStyle: "expanded",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css", // Extracted CSS files per page
        }),
        ...['index', 'leadership'].map(page => new HtmlWebpackPlugin({
            template: `./src/${page}.html`,
            chunks: [page],
            filename: `${page}.html`
        })),
    ],
};
