/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    env: {
        ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    },
}
