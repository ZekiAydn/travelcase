const withTM = require('next-transpile-modules')([
    'antd',
    'rc-util',
    '@ant-design/icons-svg'
]);

module.exports = withTM({
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com'],
    },
    i18n: {
        locales: ['en', 'tr'],
        defaultLocale: 'en',
    },
    experimental: {
        esmExternals: true,
    },
});
