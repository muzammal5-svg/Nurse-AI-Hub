/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ppr: true, // Enable Partial Prerendering

  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
};

export default nextConfig;
