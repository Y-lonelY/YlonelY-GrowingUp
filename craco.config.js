const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      loader: "less-loader",
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: getThemeVariables({ dark: true }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};