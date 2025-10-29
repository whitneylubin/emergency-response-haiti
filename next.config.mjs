import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  compress: true,
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'next/navigation']
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self)'
          }
        ]
      }
    ];
  }
};

export default withAnalyzer(config);
