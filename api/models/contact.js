const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  tanggal: { type: Date, required: true },
  pesan: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
