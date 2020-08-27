require('dotenv').config()

const branch = require("child_process")
  .execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim();

module.exports = {
  env: {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: branch ? branch : process.env.BASE_BRANCH,
  },
  webpack: (config, options) => {
    config.node = {
      fs: 'empty'
    }

    return config;
  }
}