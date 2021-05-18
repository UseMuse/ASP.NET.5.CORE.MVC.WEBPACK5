const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
var CopyPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = (env, argv) => {
    if ((!argv || !argv.mode) && process.env.ASPNETCORE_ENVIRONMENT === "Development") {
        argv = { mode: "development" };
    }
    console.debug("mode =", argv.mode);


    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    // Variable used for enabling profiling in Production
    // passed into alias object. Uses a flag if passed into the build command
    const isEnvProductionProfile =
        isEnvProduction && (process.argv.includes('--profile'));

    return [{
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction
            ? (shouldUseSourceMap
                ? 'source-map'
                : false)
            : isEnvDevelopment && 'cheap-module-source-map',
        entry: {
            //all these bundles are added to the view manually
            _Layout: './src/js/Shared/_Layout.js', //for _Layout.cshtml. (bootstrap, jquery, site.css)
            _ValidationScriptsPartial: './src/js/Shared/_ValidationScriptsPartial.js',//for _ValidationScriptsPartial.cshtml. (jquery-validation, jquery-validation-unobtrusive)
            Home: './src/js/Home/Index.js',//for Home/Index.cshtml
            'Home.Privacy': './src/js/Home/Privacy.js',//for Home/Privacy.cshtml
            'Home.DataTables': './src/js/Home/DataTables.js',//for Home/DataTables.cshtml
            'Home.Fancybox': './src/js/Home/Fancybox.js',//for Home/Fancybox.cshtml
            'Home.Daterangepicker': './src/js/Home/Daterangepicker.js',//for Home/Daterangepicker.cshtml
            'Home.Sweetalert2': './src/js/Home/Sweetalert2.js',//for Home/Sweetalert2.cshtml
            'Home.Toastr': './src/js/Home/Toastr.js',//for Home/Toastr.cshtml
            'Home.SerializeQueryParams': './src/js/Home/SerializeQueryParams.js',//for Home/SerializeQueryParams.cshtml
        },
        output: {
            path: path.resolve(__dirname, '..', 'wwwroot', 'dist'),
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isEnvDevelopment,
            filename: '[name].js',

            publicPath: `${process.env.homepage}dist/`,
            // this defaults to 'window', but by setting it to 'this' then
            // module chunks which are built will work in web workers as well.
            globalObject: 'this'
        },
        resolve: {
            extensions: [
                '.js',
                '.css',
                '.scss',
                '*',
                '.vue',
                'cshtml'
            ],
            alias: {
                'node_modules': path.resolve(__dirname, './node_modules'),
            }
        },
        //optimization: {
        //    minimize: isEnvProduction,
        //    minimizer: [() => ({
        //        terserOptions: {
        //            parse: {
        //                // We want terser to parse ecma 8 code. However, we don't want it
        //                // to apply any minification steps that turns valid ecma 5 code
        //                // into invalid ecma 5 code. This is why the 'compress' and 'output'
        //                // sections only apply transformations that are ecma 5 safe
        //                // https://github.com/facebook/create-react-app/pull/4234
        //                ecma: 8,
        //            },
        //            compress: {
        //                ecma: 5,
        //                warnings: false,
        //                // Disabled because of an issue with Uglify breaking seemingly valid code:
        //                // https://github.com/facebook/create-react-app/issues/2376
        //                // Pending further investigation:
        //                // https://github.com/mishoo/UglifyJS2/issues/2011
        //                comparisons: false,
        //                // Disabled because of an issue with Terser breaking valid code:
        //                // https://github.com/facebook/create-react-app/issues/5250
        //                // Pending further investigation:
        //                // https://github.com/terser-js/terser/issues/120
        //                inline: 2,
        //            },
        //            mangle: {
        //                safari10: true,
        //            },
        //            // Added for profiling in devtools
        //            keep_classnames: isEnvProductionProfile,
        //            keep_fnames: isEnvProductionProfile,
        //            output: {
        //                ecma: 5,
        //                comments: false,
        //                // Turned on because emoji and regex is not minified properly using default
        //                // https://github.com/facebook/create-react-app/issues/2488
        //                ascii_only: true,
        //            },
        //            sourceMap: shouldUseSourceMap,
        //        },

        //    }),
        //    new CssMinimizerPlugin(),
        //    ]
        //},
        module: {
            strictExportPresence: true,
            rules: [
                //{
                //    parser: {
                //        amd: false, // disable AMD
                //    }
                //},
                // CSS, PostCSS, Sass
                {
                    test: /\.(scss|css)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.(woff2?|eot)(\?.*)?$/, use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 5000,
                                name: `fonts/[name].[ext]`
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
                                name: `fonts/[name].[ext]`
                            },
                        },
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, use: [
                        {
                            loader: 'url-loader'
                            , options: {
                                limit: 100000
                                , name: `images/[name].[ext]`
                            }
                        }
                    ]
                },
                {
                    test: /favicon\.ico$/, use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1,
                                name: '[name].[ext]',
                            },
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
            ]
        },
        plugins: [
            // Or: To strip all locales except “en”, “es-us” and “ru”
            // (“en” is built into Moment and can’t be removed)
            new MomentLocalesPlugin({
                localesToKeep: ['ru'],
            }),
            /*new CleanWebpackPlugin(),*/
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
            }),
            new CopyPlugin({
                patterns: [
                    { from: "src/images", to: "images", noErrorOnMissing: true },
                    { from: "src/images/favicon.ico", to: "../favicon.ico", noErrorOnMissing: true },
                    /*  { from: "other", to: "public" },*/
                ],
            }),
            new MiniCssExtractPlugin({
                filename: "css/[name].css"
            })
        ]
    }]
}
