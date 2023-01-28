const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat_message", (msg) => {
    console.log("message: " + msg);
  });
});

server.listen(3010, () => {
  console.log("listening on *:3010");
});
