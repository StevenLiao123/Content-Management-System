const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // bundle the antd as required according to import files
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),

    // reassign the value of less styled css
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': 'green',
            '@text-color': 'rgba(0, 0, 0, 0.65)',
        }
    })
);