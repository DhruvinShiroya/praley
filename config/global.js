//create and export configuration object
require("dotenv").config();
const configuration = {
  db: `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@class-project.jztaoau.mongodb.net/?retryWrites=true&w=majority`,
  github: {
    clientId: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackUrl: `${process.env.HOST_URL}/users/github/callback`,
  },
};

module.exports = configuration;
