const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = (env, argv) => {
    if ((!argv || !argv.mode) && process.env.ASPNETCORE_ENVIRONMENT === "Development") {
        argv = { mode: "development" };
    }
    console.debug("mode =", argv.mode);
    const IsDevelopment = argv.mode !== "production";
    return [{
        entry: {
            //all these bundles are added to the view manually
            _Layout: './src/js/Shared/_Layout.js', //for _Layout.cshtml. (bootstrap, jquery, site.css)
            _ValidationScriptsPartial: './src/js/Shared/_ValidationScriptsPartial.js',//for _ValidationScriptsPartial.cshtml. (jquery-validation, jquery-validation-unobtrusive)
            Home: './src/js/Home/Index.js',//for Home/Index.cshtml
            'Home.Privacy': './src/js/Home/Privacy.js',//for Home/Privacy.cshtml
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, '..', 'wwwroot', 'dist'),
            publicPath: `${process.env.homepage}dist/`,
        },
        devtool: IsDevelopment ? "source-map" : false,
        mode: IsDevelopment ? 'development' : 'production',
        module: {
            rules: [
                { test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'] },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader'] },
                {
                    test: /\.(woff|woff2)$/, use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 5000,
                            },
                        },
                    ]
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/octet-stream',
                            },
                        },
                    ]
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'image/svg+xml',
                            },
                        },
                    ]
                },
            ]
        },
        plugins: [
            /*new CleanWebpackPlugin(),*/
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ]
    }]
}
