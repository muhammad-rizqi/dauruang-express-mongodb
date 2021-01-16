const mongoose = require("mongoose");

const sampahSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nama_kategori: { type: String, required: true, unique: true },
  harga: { type: Number, required: true },
  stok_gudang: { type: Number, required: true },
});

module.exports = mongoose.model("Sampah", sampahSchema);
