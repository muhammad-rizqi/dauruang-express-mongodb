const User = require("../models/user");
const { HOST } = require("../../config");

exports.get_all_user = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      code: 200,
      data: users.map((user) => {
        return {
          id: user._id,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          telepon: user.telepon,
          lokasi: user.lokasi,
          avatar: HOST + user.avatar,
          role: user.role,
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

exports.get_user_by_id = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.status(200).json({
      code: 200,
      data: {
        user: {
          id: user._id,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          telepon: user.telepon,
          lokasi: user.lokasi,
          avatar: HOST + user.avatar,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.get_user_by_token = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId)
    res.status(200).json({
      code: 200,
      data: {
        user: {
          id: user._id,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          telepon: user.telepon,
          lokasi: user.lokasi,
          avatar: HOST + user.avatar,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};

exports.update_user = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $set: req.body }
    );
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

exports.update_avatar = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $set: { avatar: req.file.path } }
    );
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

exports.delete_user = async (req, res) => {
  try {
    const user = await User.remove({ _id: req.params.userId });
    res.status(200).json({
      code: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};
