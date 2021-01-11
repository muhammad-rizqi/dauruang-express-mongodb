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
      data: docs.map((sampah) => {
        return {
          id: sampah._id,
          nama_kategori: sampah.nama_kategori,
          harga: sampah.harga,
        };
      }),
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_stok = async (req, res) => {
  try {
    const docs = await Sampah.find();
    res.status(200).json({
      code: 200,
      data: docs.map((sampah) => {
        return {
          id: sampah._id,
          nama_kategori: sampah.nama_kategori,
          harga: sampah.harga,
          stok_gudang: sampah.stok_gudang,
        };
      }),
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.update_sampah = async (req, res) => {
  try {
    await Sampah.updateOne({ _id: req.params.sampahId }, { $set: req.body });
    res.status(200).json({
      code: 200,
      message: "Sucess",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_sampah_detail = async (req, res) => {
  const id = req.params.sampahId;
  try {
    const sampah = await Sampah.find(id);
    res.status(200).json({
      code: 200,
      data: {
        id: sampah._id,
        nama_kategori: sampah.nama_kategori,
        harga: sampah.harga,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.delete_sampah = async (req, res) => {
  try {
    await Sampah.deleteOne(req.params.sampahId);
    res.status(200).json({
      code: 200,
      message: "Sucess dihapus",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};
