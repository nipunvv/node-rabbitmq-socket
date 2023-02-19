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
    { $unwind: "$from" },
    { $unwind: "$to" },
  ]).exec((err, conversations) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send(conversations);
  });
};

exports.createConversation = (req, res) => {
  Conversation.findOne({
    from: req.userId,
    to: req.body.to,
  }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!data) {
      const conversation = new Conversation({
        from: req.userId,
        to: req.body.to,
        testId: req.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    
      conversation.save((err, conversation) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        res.status(201).send({
          id: conversation.id,
          message: "Conversation created successfully!",
        });
      });
    } else {
      res.status(201).send({
        id: data.id,
        message: "Conversation created successfully!",
      });
    }
  })
  
};
