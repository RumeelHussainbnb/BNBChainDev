/**
 * @type {import('next').NextConfig}
 */
 const moduleExports = {
  env:{
    SITE_URL: "https://main.d1aos5rwqljdla.amplifyapp.com",
    NEXT_PUBLIC_API_ENDPOINT: "http://bnbchain-dev-portal-869386302.ap-northeast-1.elb.amazonaws.com:3001",
    NODE_ENV: "production",
    MONGODB_URI: "mongodb+srv://bnb_chain:ThisIsForBnbChain@cluster0.nmbr74z.mongodb.net/bnbzyt7891234_chain?retryWrites=true&w=majority"
  },
  basePath: "/library",
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.hashnode.com',
      'cdn.pixabay.com',
      'pbs.twimg.com',
      'cardea.imgix.net',
      'i.ytimg.com',
      'images.unsplash.com',
      'static-cdn.jtvnw.net',
      'clips-media-assets2.twitch.tv',
      'www.youtube.com',
      'pbs.twimg.com',
      'opengraph.githubassets.com',
      'res.cloudinary.com',
      'repository-images.githubusercontent.com',
      'figment.io',
      'lorisleiva.com',
      'www.notion.so',
      'dev.to',
      'twitter.com',
      'alexgr.in',
      'avatars.githubusercontent.com',
      'www.gravatar.com',
      'api.typedream.com',
      'blog.neodyme.io',
      'lh4.googleusercontent.com',
      'www.jpmti2016.com',
      'www.crossmint.io'
    ],
    formats: ['image/avif', 'image/webp']
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/library'
      }
    ];
  }
}


module.exports = moduleExports;
