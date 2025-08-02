/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp4|webm)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/media/',
                    outputPath: 'static/media/',
                    name: '[name].[hash].[ext]',
                },
            },
        });
        return config;
    },
};

module.exports = nextConfig;
  