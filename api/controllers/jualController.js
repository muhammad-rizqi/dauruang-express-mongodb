const Jual = require("../models/jual");
const Bank = require("../models/bank");
const mongoose = require("mongoose");
const Sampah = require("../models/sampah");

exports.add_jual = async (req, res) => {
  const { jenis_sampah, harga, berat, client, id_pengurus } = req.body;
  try {
    const debit = harga * berat;
    const dataBank = await Bank.findOne().sort({ tanggal: "desc" });
    const sampah = await Sampah.findById(jenis_sampah);
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

    await Sampah.updateOne(
      { _id: jenis_sampah },
      { stok_gudang: sampah.stok_gudang - berat }
    );

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
    const data = await Jual.find()
      .populate("jenis_sampah")
      .populate("pengurus");

    res.status(200).json({
      code: 200,
      data: data.map((item) => {
        return {
          id: item._id,
          tanggal: item.tanggal,
          jenis_sampah: item.jenis_sampah._id,
          client: item.client,
          harga_satuan: item.harga_satuan,
          berat: item.berat,
          debit: item.debit,
          relation: {
            jenis_sampah: {
              id: item.jenis_sampah._id,
              nama_kategori: item.jenis_sampah.nama_kategori,
              harga: item.jenis_sampah.harga,
            },
            pengurus: {
              id: item.pengurus._id,
              nama_lengkap: item.pengurus.nama_lengkap,
              telepon: item.pengurus.telepon,
              avatar: item.pengurus.avatar,
            },
          },
        };
      }),
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

exports.get_saldo = async (req, res) => {
  try {
    const dataBank = await Bank.findOne().sort({ tanggal: "desc" });

    const saldo = dataBank ? dataBank.saldo : 0;

    res.status(200).json({
      code: 200,
      data: {
        saldo: saldo,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};
