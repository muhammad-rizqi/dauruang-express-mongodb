const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  tanggal: { type: Date, required: true },
  pesan: { type: String, required: true },
  is_read: { type: Number, default: 0 },
});

module.exports = mongoose.model("Chat", chatSchema);
