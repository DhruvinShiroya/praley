const mongoose = require("mongoose");

// use plm package to extent the user model

var userSchemaDefinition = {
    sender : {type}
  username: { type: String, required: true },
  password: { type: String },
};

var userSchema = new mongoose.Schema(userSchemaDefinition);

module.exports = new mongoose.model("message", userSchema);
