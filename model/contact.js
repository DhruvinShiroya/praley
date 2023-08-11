const mongoose = require("mongoose");

// use plm package to extent the user model

var contactSchemaDefinition = {
  name: { type: String, required: true },
  contactEmail: { type: String },
  userId: { type: String },
  date: {
    type: Date,
  },
};

var contactSchema = new mongoose.Schema(contactSchemaDefinition);

module.exports = new mongoose.model("contact", contactSchema);
