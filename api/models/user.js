const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nama_lengkap: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telepon: { type: String, required: true },
  lokasi: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "https://picsum.photos/200",
  },
  role: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", userSchema);
