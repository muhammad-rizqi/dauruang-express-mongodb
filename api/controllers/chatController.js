var mongoose = require("mongoose");
const Chat = require("../models/chat");
const _ = require("lodash");
const User = require("../models/user");
exports.send_chat = async (req, res) => {
  const chat = new Chat({
    _id: mongoose.Types.ObjectId(),
    to: req.body.to,
    from: req.params.from,
    pesan: req.body.pesan,
    tanggal: new Date(),
  });
  try {
    const docs = await chat.save();
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

exports.get_chat_user = async (req, res) => {
  const userId = req.params.userId;
  try {
    const docs = await Chat.find({ to: userId }).distinct("from");

    const docs2 = await Chat.find({ from: userId }).distinct("to");

    const merged = [...docs, ...docs2];

    res.status(200).json({
      code: 200,
      data: [...new Set([...merged])],
    });
  } catch (error) {
    console.log(error);
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
