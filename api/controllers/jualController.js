const Jual = require("../models/jual");
const Bank = require("../models/bank");
const mongoose = require("mongoose");

exports.add_jual = async (req, res) => {
  const { jenis_sampah, harga, berat, client, id_pengurus } = req.body;
  try {
    const debit = harga * berat;
    const dataBank = await Bank.findOne().sort({ tanggal: "desc" });

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
    const dataJual = await jual.save();

    const saldo = dataBank ? dataBank.saldo + debit : debit;

    const bank = new Bank({
      _id: mongoose.Types.ObjectId(),
      id_penjualan: dataJual._id,
      tanggal: dataJual.tanggal,
      keterangan: "jual",
      debit: debit,
      saldo: saldo,
    });
    await bank.save();
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
