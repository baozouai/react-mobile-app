const { override, addBabelPlugins, fixBabelImports } = require('customize-cra');
module.exports = override(
  ...addBabelPlugins(
    [
      "styled-jsx/babel",
      { "plugins": ["styled-jsx-plugin-sass"] }
    ]
  ),
  fixBabelImports('import', {
    libraryName: 'antd-mobile', style: 'css'
  })
)