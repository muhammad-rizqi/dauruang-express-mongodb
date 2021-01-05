const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id_penarikan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tabungan",
    default: null,
  },
  id_penjualan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jual",
    default: null,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  keterangan: {
    type: String,
    required: true,
  },
  debit: { type: Number, default: 0 },
  kredit: { type: Number, default: 0 },
});

module.exports = mongoose.model("Bank", bankSchema);
