const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, alias: "id" },
  nama_lengkap: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telepon: { type: String, required: true },
  lokasi: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "uploads/images/2021-01-18T10:15:21.023Zrn_image_picker_lib_temp_e2ee7ace-8652-445a-ac35-a25d082ef19d.jpg",
  },
  role: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", userSchema);
