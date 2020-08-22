require('dotenv').config()

module.exports = {
  env: {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  }
}