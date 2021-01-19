const Jemput = require("../models/jemput");
const mongoose = require("mongoose");

exports.add_jemput = async (req, res) => {
  const { id_nasabah, nama_pengirim, telepon, lokasi, keterangan } = req.body;
  try {
    const jemput = new Jemput({
      _id: mongoose.Types.ObjectId(),
      tanggal: new Date(),
      nasabah: id_nasabah,
      nama_pengirim,
      telepon,
      lokasi,
      keterangan,
    });
    const status = await jemput.save();
    res.status(201).json({
      code: 200,
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
    const jemputs = await Jemput.find()
      .populate("pengurus")
      .populate("nasabah");
    res.status(201).json({
      code: 200,
      data: jemputs.map((jemput) => {
        const pengurus = jemput.pengurus
          ? {
              id: jemput.pengurus._id,
              nama_lengkap: jemput.pengurus.nama_lengkap,
              telepon: jemput.pengurus.telepon,
              lokasi: jemput.pengurus.lokasi,
              avatar: jemput.pengurus.avatar,
            }
          : null;

        return {
          id: jemput._id,
          id_nasabah: jemput.nasabah._id,
          id_pengurus: jemput.pengurus ? jemput.pengurus._id : null,
          tanggal: jemput.tanggal,
          nama_pengirim: jemput.nama_pengirim,
          telepon: jemput.telepon,
          keterangan: jemput.keterangan,
          lokasi: jemput.lokasi,
          status: jemput.status, // 0 : pending, 1: "dijemput", 2: "selesai", 3: "dibatalkan"
          relation: {
            nasabah: {
              id: jemput.nasabah._id,
              nama_lengkap: jemput.nasabah.nama_lengkap,
              telepon: jemput.nasabah.telepon,
              lokasi: jemput.nasabah.lokasi,
              avatar: jemput.nasabah.avatar,
            },
            pengurus: pengurus,
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

exports.get_jemput_by_user = async (req, res) => {
  try {
    const jemputs = await Jemput.find({ nasabah: req.params.userId })
      .populate("pengurus")
      .populate("nasabah");
    res.status(201).json({
      code: 200,
      data: jemputs.map((jemput) => {
        return {
          id: jemput._id,
          id_nasabah: jemput.nasabah._id,
          id_pengurus: jemput.pengurus ? jemput.pengurus._id : null,
          tanggal: jemput.tanggal,
          nama_pengirim: jemput.nama_pengirim,
          telepon: jemput.telepon,
          keterangan: jemput.keterangan,
          lokasi: jemput.lokasi,
          status: jemput.status, // 0 : pending, 1: "dijemput", 2: "selesai", 3: "dibatalkan"
          relation:
            jemput.pengurus == null
              ? null
              : {
                  pengurus: {
                    id: jemput.pengurus._id,
                    nama_lengkap: jemput.pengurus.nama_lengkap,
                    telepon: jemput.pengurus.telepon,
                    lokasi: jemput.pengurus.lokasi,
                    avatar: jemput.pengurus.avatar,
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
