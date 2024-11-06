const withTM = require('next-transpile-modules')([
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util',
    'rc-tree'
]);

module.exports = withTM({
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com'],
    },
    i18n: {
        locales: ['en', 'tr'],
        defaultLocale: 'tr',
    },
    experimental: {
        esmExternals: true,
    },
});
