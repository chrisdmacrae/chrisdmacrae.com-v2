require('dotenv').config()
const { resolve } = require("path")

const VERCEL_BRANCH = process.env.VERCEL_GITHUB_COMMIT_REF;
const SYSTEM_BRANCH = require("child_process")
  .execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim();
const BRANCH = VERCEL_BRANCH ? VERCEL_BRANCH : SYSTEM_BRANCH;

module.exports = {
  env: {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: BRANCH ? BRANCH : process.env.BASE_BRANCH,
    USE_REMOTE: process.env.USE_REMOTE == "true"
  },
  images: {
    domains: ['images.unsplash.com', 'images-na.ssl-images-amazon.com'],
  },
  webpack: (config, options) => {
    config.node = {
      fs: 'empty'
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "cdm-content": resolve(__dirname, "./packages/cdm-content"),
      "cdm-ui": resolve(__dirname, "./packages/cdm-ui"),
    }

    return config;
  }
}
