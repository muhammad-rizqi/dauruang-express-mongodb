const Tabungan = require("../models/tabungan");
const Sampah = require("../models/sampah");
const mongoose = require("mongoose");

exports.add_setor = async (req, res) => {
  const { id_nasabah, jenis_sampah, berat, dijemput } = req.body;
  try {
    const sampah = await Sampah.findById(jenis_sampah);
    const debit =
      dijemput === 0
        ? sampah.harga * berat
        : sampah.harga * berat - sampah.harga * berat * 0.2;

    const tabunganLast = await Tabungan.findOne().sort({ tanggal: "desc" });
    console.log(tabunganLast);
    const saldo = tabunganLast !== null ? tabunganLast.saldo + debit : debit;

    const tabungan = new Tabungan({
      _id: mongoose.Types.ObjectId(),
      tanggal: new Date(),
      keterangan: "setor",
      nasabah: id_nasabah,
      jenis_sampah: jenis_sampah,
      berat: berat,
      debit: debit,
      saldo: saldo,
    });

    const data = await tabungan.save();

    res.status(200).json({
      code: 200,
      data: data,
      message: "Add Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_setor = async (req, res) => {
  try {
    const docs = await Tabungan.find({ keterangan: "setor" });
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

exports.get_setor_by_user = async (req, res) => {
  try {
    const docs = await Tabungan.find({
      nasabah: req.params.userId,
      keterangan: "setor",
    });
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

exports.get_tabungan = async (req, res) => {
  try {
    const docs = await Tabungan.find();
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

exports.get_saldo_by_user = async (req, res) => {
  try {
    const docs = await Tabungan.findOne({
      nasabah: req.params.userId,
    }).sort({ tanggal: "desc" });

    res.status(200).json({
      code: 200,
      data: { saldo: docs ? docs.saldo : 0 },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};
