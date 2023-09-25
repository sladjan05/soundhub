/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.dicebear.com'
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co'
            }
        ]
    }
};
