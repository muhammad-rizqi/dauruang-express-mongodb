const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY, HOST } = require("../../config");

exports.register = (req, res) => {
  const { nama_lengkap, email, password, telepon, lokasi } = req.body;

  console.log(req.body);
  bcrypt.hash(password, 10, (err, hash) => {
    console.log("hasing password");
    console.log(err);
    if (err) {
      console.log("hasing password failed");
      return res.status(500).json({
        error: err,
      });
    } else {
      console.log("hasing password success");
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        nama_lengkap: nama_lengkap,
        email: email,
        telepon: telepon,
        lokasi: lokasi,
        password: hash,
        role: req.body.role ? req.body.role : 1,
      });
      user
        .save()
        .then((result) => {
          const token = jwt.sign(
            {
              email: result.email,
              _id: result._id,
            },
            JWT_KEY,
            {
              expiresIn: "1d",
            }
          );
          res.status(201).json({
            code: 201,
            data: {
              user: {
                id: result._id,
                nama_lengkap: result.nama_lengkap,
                email: result.email,
                telepon: result.telepon,
                lokasi: result.lokasi,
                avatar: HOST + result.avatar,
                role: result.role,
              },
              token: token,
            },
            message: "Berhasil mendaftar",
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      return res.status(401).json({
        code: 401,
        message: "Email not found",
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({
        code: 401,
        message: "Wrong password",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      JWT_KEY,
      {
        expiresIn: "5h",
      }
    );

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
        token: token,
      },
      message: "Login berhasil",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      error: err,
    });
  }
};

exports.forgot_password = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Konfirmasi reset password telah dikirim via email",
  });
};
