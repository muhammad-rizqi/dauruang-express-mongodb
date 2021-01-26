var mongoose = require("mongoose");
const Chat = require("../models/chat");
const _ = require("lodash");
const Contact = require("../models/contact");
const { HOST } = require("../../config");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1144035",
  key: "dd8cf49ab599dd57da5d",
  secret: "4bdc61c2f827e6c7cd63",
  cluster: "ap1",
  useTLS: true,
});

exports.send_chat = async (req, res) => {
  const chat = new Chat({
    _id: mongoose.Types.ObjectId(),
    to: req.body.to,
    from: req.params.from,
    pesan: req.body.pesan,
    tanggal: new Date(),
  });

  try {
    const contact = await Contact.updateMany(
      {
        $or: [
          { $and: [{ user: req.body.to }, { contact: req.params.from }] },
          { $and: [{ user: req.params.from }, { contact: req.body.to }] },
        ],
      },
      { $set: { pesan: req.body.pesan, tanggal: new Date() } }
    );
    console.log(contact);
    if (contact.nModified === 0) {
      const contact = new Contact({
        _id: mongoose.Types.ObjectId(),
        user: req.body.to,
        contact: req.params.from,
        pesan: req.body.pesan,
        tanggal: new Date(),
      });
      const contact2 = new Contact({
        _id: mongoose.Types.ObjectId(),
        user: req.params.from,
        contact: req.body.to,
        pesan: req.body.pesan,
        tanggal: new Date(),
      });

      await contact.save();
      await contact2.save();
    }

    const docs = await chat.save();
    res.status(200).json({
      code: 200,
      data: docs,
    });

    pusher.trigger("my-channel", "my-event", docs);
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
    const contact = await Contact.find({ user: userId })
      .populate("user")
      .populate("contact");
    res.status(200).json({
      code: 200,
      data: contact.map((item, index) => {
        return {
          id: index,
          to: item.contact._id,
          from: item.user._id,
          relation: {
            from: {
              id: item.user._id,
              nama_lengkap: item.user.nama_lengkap,
              avatar: HOST + item.user.avatar,
            },
            to: {
              id: item.contact._id,
              nama_lengkap: item.contact.nama_lengkap,
              avatar: HOST + item.contact.avatar,
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

exports.get_chat_messages = async (req, res) => {
  try {
    const chat = await Chat.find({
      $or: [
        { $and: [{ to: req.body.to }, { from: req.params.from }] },
        { $and: [{ to: req.params.from }, { from: req.body.to }] },
      ],
    });
    res.status(200).json({
      code: 200,
      data: chat.map((item) => {
        return {
          id: item._id,
          from: item.from,
          to: item.to,
          pesan: item.pesan,
          created_at: item.tanggal,
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
