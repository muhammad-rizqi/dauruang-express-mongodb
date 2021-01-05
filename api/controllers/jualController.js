const Jual = require("../models/jual");
const mongoose = require("mongoose");

exports.add_jual = async (req, res) => {
  const { jenis_sampah, harga, berat, client, id_pengurus } = req.body;
  try {
    const debit = harga * berat;
    const jual = new Jual({
      _id: mongoose.Types.ObjectId(),
      tanggal: new Date(),
      jenis_sampah: jenis_sampah,
      client: client,
      pengurus: id_pengurus,
      harga_satuan: harga,
      berat: berat,
      debit: debit,
    });
    await jual.save();
    res.status(201).json({
      code: 201,
      message: "Penjualan berhasil ditambahkan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_jual = async (req, res) => {
  try {
    const data = await Jual.find();
    res.status(200).json({
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_jual_by_id = async (req, res) => {
  try {
    const data = await Jual.findById(req.params.jualId);
    res.status(200).json({
      code: 200,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.update_jual = async (req, res) => {
  try {
    await Jual.updateOne({ _id: req.params.jualId }, { $set: req.body });
    res.status(200).json({
      code: 200,
      message: "Update Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.delete_jual = async (req, res) => {
  try {
    await Jual.remove({ _id: req.params.jualId });
    res.status(200).json({
      code: 200,
      data: "Delete success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};
