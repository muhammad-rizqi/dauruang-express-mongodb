var mongoose = require("mongoose");
const Chat = require("../models/chat");
const _ = require("lodash");
const User = require("../models/user");
const Contact = require("../models/contact");

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
    const contact = await Contact.find({ user: userId }).populate("contact");
    res.status(200).json({
      code: 200,
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      error: error,
    });
  }
};
