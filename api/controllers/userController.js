const User = require("../models/user");
const PasswordReset = require("../models/password");
const { HOST } = require("../../config");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { sendEmail } = require("../utils/mail_helper");

exports.get_all_user = async (req, res) => {
  try {
    const users = await User.find();
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
    const user = await User.findById(req.params.userId);
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
    const user = await User.findById(req.userData.userId);
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
    const user = await User.findById(req.params.userId);
    const match =
      req.userData.role === 999
        ? true
        : await bcrypt.compare(req.body.password, user.password);

    if (req.userData.role === 999 || match) {
      await User.remove({ _id: req.params.userId });
      res.status(200).json({
        code: 200,
        message: "User deleted successfully",
      });
    } else {
      return res.status(401).json({
        code: 401,
        message: "Wrong password",
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

exports.change_password = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match || req.body.new_password !== req.body.password_confirmation) {
      return res.status(401).json({
        code: 401,
        message: "Wrong password",
      });
    }

    const new_password = bcrypt.hashSync(req.body.new_password, 10);

    await User.updateOne(
      { _id: req.params.userId },
      { $set: { password: new_password } }
    );
    res.status(200).json({
      code: 200,
      message: "Ubah password berhasil",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      error: err,
    });
  }
};

exports.reset_password = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(500).json({
      code: 500,
      error: "User not found",
    });
  }
  const token = v4().toString().replace(/-/g, "");
  PasswordReset.updateOne(
    {
      user: user._id,
    },
    {
      user: user._id,
      token: token,
    },
    {
      upsert: true,
    }
  )
    .then(async () => {
      const resetLink = `${process.env.WEB}reset-confirm/${token}`;

      await sendEmail({
        to: user.email,
        subject: "Atur ulang password",
        text: `Halo ${user.nama_lengkap}, ini link untuk mengatur ulang password Anda: ${resetLink}. 
        Jika anda tidak meminta nya harap laporkan kepada kami.\n\n Salam \n Admin Daur Uang`,
      });

      res.status(200).json({
        code: 200,
        message: "Token sudah dikirim ke alamat pengguna",
      });
    })
    .catch(() => {
      res.status(500).json({
        code: 500,
        error: "Failed to reset password",
      });
    });
};

exports.reset_confirm = async (req, res) => {
  const token = req.params.token;
  const passwordReset = await PasswordReset.findOne({ token });

  const new_password = bcrypt.hashSync(req.body.password, 10);
  /* Update user */
  let user = await User.findOne({ _id: passwordReset.user });
  user.password = new_password;

  user
    .save()
    .then(async (savedUser) => {
      /* Delete password reset document in collection */
      await PasswordReset.deleteOne({ _id: passwordReset._id });
      /* Redirect to login page with success message */
      res.status(200).json({
        code: 200,
        message: "Password berhasil diubah",
      });
    })
    .catch((error) => {
      /* Redirect back to reset-confirm page */
      res.status(500).json({
        code: 500,
        message: "Password gagal diubah",
      });
    });
};
