const Jemput = require("../models/jemput");
const mongoose = require("mongoose");
const user = require("../models/user");

exports.add_jemput = async (req, res) => {
  const { id_nasabah, nama_pengirim, telepon, lokasi, status } = req.body;
  try {
    const jemput = new Jemput({
      _id: mongoose.Types.ObjectId(),
      nasabah: id_nasabah,
      nama_pengirim: nama_pengirim,
      telepon: telepon,
      lokasi: lokasi,
      status: 1,
    });
    const status = await jemput.save();
    res.status(201).json({
      code: 200,
      data: status,
      message: "Penjemputan diajukan, petugas akan segera menjemput",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_jemput = async (req, res) => {
  try {
    const jemput = await Jemput.find().populate("pengurus").populate("nasabah");
    res.status(201).json({
      code: 200,
      data: jemput,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_jemput_by_user = async (req, res) => {
  try {
    const jemput = await Jemput.find({ nasabah: req.params.userId })
      .populate("pengurus")
      .populate("nasabah");
    res.status(201).json({
      code: 200,
      data: jemput,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.update_jemput = async (req, res) => {
  const data = {};
  if (req.body.id_nasabah) {
    data.nasabah = req.body.id_nasabah;
    data.status = req.body.status;
  } else if (req.body.id_pengurus) {
    data.pengurus = req.body.id_pengurus;
    data.status = req.body.status;
  }
  try {
    await Jemput.updateOne({ _id: req.params.jemputId }, { $set: data });
    res.status(201).json({
      code: 200,
      message: "Status berhasil diubah",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};
