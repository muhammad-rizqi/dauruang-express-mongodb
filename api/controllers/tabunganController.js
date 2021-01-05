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

    const tabunganLast = await Tabungan.findOne().sort({ created_at: -1 });

    const saldo = tabunganLast ? tabunganLast.saldo + debit : debit;

    const tabungan = new Tabungan({
      _id: mongoose.Types.ObjectId(),
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
      code: 200,
      error: error,
    });
  }
};

exports.get_setor = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "GET Success",
  });
};

exports.get_setor_by_user = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "GET Success with id : " + req.params.userId,
  });
};
