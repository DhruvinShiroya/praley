const mongoose = require("mongoose");

var messageSchemaDefinition = {
  message: { type: String, required: true },
  senderId: { type: String },
  reciverId: { type: String, required: true },
  date: {
    type: Date,
  },
};

var messageSchema = new mongoose.Schema(messageSchemaDefinition);

module.exports = new mongoose.model("message", messageSchema);
