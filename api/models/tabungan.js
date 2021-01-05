const mongoose = require("mongoose");

const tabunganSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tanggal: {
    type: Date,
    default: new Date(),
  },
  nasabah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  keterangan: { type: String, required: true },
  pengurus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  jenis_sampah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sampah",
    default: null,
  },
  berat: { type: Number, default: null },
  debit: { type: Number, default: 0 },
  kredit: { type: Number, default: 0 },
  saldo: { type: Number, default: 0 },
});

module.exports = mongoose.model("Tabungan", tabunganSchema);
