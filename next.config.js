/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'esucodes.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'esucodes.com', // Http ihtimaline karşı
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.esucodes.com', // "www" ile gelirse patlamasın
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com', // ⚠️ Yazar resimleri buradan gelir!
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Local testler için
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig