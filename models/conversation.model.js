const mongoose = require("mongoose");

const Conversation = mongoose.model(
  "Conversation",
  new mongoose.Schema(
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  ).set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  })
);

module.exports = Conversation;
