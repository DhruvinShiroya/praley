//create and export configuration object
require("dotenv").config();
const configuration = {
  db: `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@class-project.jztaoau.mongodb.net/?retryWrites=true&w=majority`,
};

module.exports = configuration;
