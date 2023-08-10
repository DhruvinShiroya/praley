const mongoose = require("mongoose");

// use plm package to extent the user model

const plm = require("passport-local-mongoose");

var userSchemaDefinition = {
  username: { type: String, required: true },
  password: { type: String },
};

var userSchema = new mongoose.Schema(userSchemaDefinition);

//plm is plugin that we can add with userSchema which has functionality like hashing/ salting

userSchema.plugin(plm);

module.exports = new mongoose.model("User", userSchema);
