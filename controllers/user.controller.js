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
