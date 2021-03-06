const Tabungan = require("../models/tabungan");
const Sampah = require("../models/sampah");
const mongoose = require("mongoose");
const Bank = require("../models/bank");

exports.add_setor = async (req, res) => {
  const { id_nasabah, jenis_sampah, berat, dijemput } = req.body;
  try {
    const sampah = await Sampah.findById(jenis_sampah);
    const debit =
      dijemput === 0
        ? sampah.harga * berat
        : sampah.harga * berat - sampah.harga * berat * 0.2;

    const tabunganLast = await Tabungan.findOne().sort({ tanggal: "desc" });
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
    await Sampah.updateOne(
      { _id: jenis_sampah },
      { stok_gudang: parseFloat(sampah.stok_gudang) + parseFloat(berat) }
    );
    await tabungan.save();

    res.status(200).json({
      code: 200,
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

exports.tarik = async (req, res) => {
  const { id_nasabah, kredit } = req.body;
  try {
    const tabunganLast = await Tabungan.findOne().sort({ tanggal: "desc" });
    const dataBank = await Bank.findOne().sort({ tanggal: "desc" });
    const saldoBank = dataBank ? dataBank.saldo - kredit : kredit;

    if (tabunganLast && saldoBank >= kredit) {
      const saldo =
        tabunganLast !== null ? tabunganLast.saldo - kredit : kredit;

      const tabungan = new Tabungan({
        _id: mongoose.Types.ObjectId(),
        tanggal: new Date(),
        keterangan: "tarik",
        nasabah: id_nasabah,
        kredit: kredit,
        saldo: saldo,
      });

      const data = await tabungan.save();

      const bank = new Bank({
        _id: mongoose.Types.ObjectId(),
        id_penarikan: data._id,
        tanggal: data.tanggal,
        keterangan: "tarik",
        kredit: kredit,
        saldo: saldoBank,
      });
      await bank.save();

      res.status(200).json({
        code: 200,
        message: "Tarik Success",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Saldo tidak cukup",
      });
    }
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
    const docs = await Tabungan.find({ keterangan: "setor" })
      .sort({ tanggal: "desc" })
      .populate("nasabah")
      .populate("jenis_sampah");
    res.status(200).json({
      code: 200,
      data: docs.map((setor) => {
        return {
          id: setor._id,
          id_nasabah: setor.nasabah._id,
          tanggal: setor.tanggal,
          keterangan: setor.keterangan,
          jenis_sampah: setor.jenis_sampah._id,
          berat: setor.berat,
          debit: setor.debit,
          kredit: setor.kredit,
          saldo: setor.saldo,
          relation: {
            jenis_sampah: {
              id: setor.jenis_sampah._id,
              nama_kategori: setor.jenis_sampah.nama_kategori,
              harga: setor.jenis_sampah.harga,
            },
            nasabah: {
              id: setor.nasabah._id,
              nama_lengkap: setor.nasabah.nama_lengkap,
              telepon: setor.nasabah.telepon,
              lokasi: setor.nasabah.lokasi,
              avatar: setor.nasabah.avatar,
            },
          },
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

exports.get_setor_by_user = async (req, res) => {
  try {
    const docs = await Tabungan.find({
      nasabah: req.params.userId,
      keterangan: "setor",
    })
      .sort({ tanggal: "desc" })
      .populate("jenis_sampah");
    res.status(200).json({
      code: 200,
      data: docs.map((setor) => {
        return {
          id: setor._id,
          id_nasabah: setor.nasabah,
          tanggal: setor.tanggal,
          keterangan: setor.keterangan,
          jenis_sampah: setor.jenis_sampah._id,
          berat: setor.berat,
          debit: setor.debit,
          kredit: setor.kredit,
          saldo: setor.saldo,
          relation: {
            jenis_sampah: {
              id: setor.jenis_sampah._id,
              nama_kategori: setor.jenis_sampah.nama_kategori,
              harga: setor.jenis_sampah.harga,
            },
          },
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

exports.get_tarik_by_user = async (req, res) => {
  try {
    const docs = await Tabungan.find({
      nasabah: req.params.userId,
      keterangan: "tarik",
    }).sort({ tanggal: "desc" });
    res.status(200).json({
      code: 200,
      data: docs.map((tarik) => {
        return {
          id: tarik._id,
          id_nasabah: tarik.nasabah,
          tanggal: tarik.tanggal,
          keterangan: tarik.keterangan,
          kredit: tarik.kredit,
          saldo: tarik.saldo,
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
