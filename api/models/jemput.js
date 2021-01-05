const mongoose = require("mongoose");

const jemputSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nasabah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nama_pengirim: { type: String, required: true },
  telepon: { type: String, required: true },
  lokasi: { type: String, required: true },
  status: { type: Number, required: true },
  pengurus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

module.exports = mongoose.model("Jemput", jemputSchema);
