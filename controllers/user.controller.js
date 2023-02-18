const db = require("../models");
const User = db.user;

exports.getUserDetails = (req, res) => {
  User.findOne({
    id: req.userId,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
};

exports.getAllUsers = (req, res) => {
  User.find({ _id: { $ne: req.userId } }).exec((err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const updatedUserData = [];
    users.map((user) => {
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      updatedUserData.push(userData);
    })

    res.status(200).send(updatedUserData);
  });
};
