const rewireStyledComponents = require('react-app-rewire-styled-components');
require('react-app-rewire-typescript');
require('fork-ts-checker-webpack-plugin');

const {
    override,
    getBabelLoader,
    addWebpackModuleRule
} = require('customize-cra')

module.exports = (config, env) => {
    config = rewireStyledComponents(config, env);

    const babelLoader = getBabelLoader(config);

    return override(
        addWebpackModuleRule({
                test: /\.worker\.ts$/,
                use: [
                    {
                        loader: 'comlink-loader',
                        options : {
                            singleton : true
                        }
                    },
                    {
                        loader: babelLoader.loader,
                        options: babelLoader.options
                    }
                ]
            }
        )
    )(config, env)
}