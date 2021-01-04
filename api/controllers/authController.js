const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config");

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
              user: result,
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

exports.login = (req, res) => {
  res.status(200).json({
    code: 200,
    data: {
      user: {
        id: 1,
        nama_lengkap: "Kevin",
        email: "kevin@gmail.com",
        telepon: "0812345678",
        lokasi: "http://google.com/maps/a1seqwe123123",
        avatar: "http://avatar.com/img/a1seqwe123123",
        role: 1,
        created_at: "2020-12-12",
        updated_at: null,
      },
      token:
        "asjdaldinulfhaskldjfhlkjashflsauyfliuysadlbfkaweriuwayeiruywalbnrkwajhrkjhsadkfysadibufsadkjfhsdhfjksdahfksdhaflkwaeilrywkljefhlkwaefylkwauelfknhlkasjhflksjdhfiuwaehklrjwhkfjwhalkfjhawe",
    },
    message: "Login berhasil",
  });
};

exports.forgot_password = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Konfirmasi reset password telah dikirim via email",
  });
};
