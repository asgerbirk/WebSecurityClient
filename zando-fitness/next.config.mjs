/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['placehold.co'],
        dangerouslyAllowSVG: true, // Enable SVG rendering
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Optional: Secure CSP
    }
};

export default nextConfig;
