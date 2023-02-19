const db = require("../models");
const Conversation = db.conversation;

exports.getAllConversations = (req, res) => {
  Conversation.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "to",
        foreignField: "_id",
        as: "to",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "from",
        foreignField: "_id",
        as: "from",
      },
    },
    { $unset: ["from.password", "to.password", "from.__v", "to.__v", "__v"] },
  ]).exec(
    (err, conversations) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send(conversations);
    }
  );
};

exports.createConversation = (req, res) => {
  const conversation = new Conversation({
    from: req.userId,
    to: req.body.to,
    testId: req.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  conversation.save((err, _) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(201).send({ message: "Conversation created successfully!" });
  });
};
