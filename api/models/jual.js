const mongoose = require("mongoose");

const jualSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tanggal: {
    type: Date,
    required: true,
  },
  jenis_sampah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sampah",
    default: null,
  },
  client: {
    type: String,
    required: true,
  },
  pengurus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  harga_satuan: { type: Number, default: 0 },
  berat: { type: Number, default: 0 },
  debit: { type: Number, default: 0 },
});

module.exports = mongoose.model("Jual", jualSchema);
