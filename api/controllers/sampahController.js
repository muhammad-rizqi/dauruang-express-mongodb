const Sampah = require("../models/sampah");

var mongoose = require("mongoose");

exports.add_sampah = async (req, res) => {
  const sampah = new Sampah({
    _id: mongoose.Types.ObjectId(),
    nama_kategori: req.body.nama_kategori,
    harga: req.body.harga,
    stok_gudang: req.body.stok_gudang,
  });
  try {
    const docs = await sampah.save();
    res.status(200).json({
      code: 200,
      data: docs,
      message: "Add Category Success",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_sampah = async (req, res) => {
  try {
    const docs = await Sampah.find();
    res.status(200).json({
      code: 200,
      data: docs,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.update_sampah = (req, res) => {
  const id = req.params.sampahId;
  res.status(200).json({
    code: 200,
    message: "Success UPDATE " + id,
  });
};

exports.get_sampah_detail = (req, res) => {
  const id = req.params.sampahId;
  res.status(200).json({
    code: 200,
    message: "Success GET " + id,
  });
};

exports.delete_sampah = (req, res) => {
  const id = req.params.sampahId;
  res.status(200).json({
    code: 200,
    message: "Success DELETE " + id,
  });
};
