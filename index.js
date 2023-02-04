const express = require("express");
const app = express();
const http = require("http");
const jwt = require("jsonwebtoken");
const config = require("./config/auth.config");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const { isVerified, userId } = authenticateSocketConnection(socket);
  if (!isVerified) {
    socket.emit("close_reason", "Unauthorized");
    socket.disconnect();
  }
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat_message", (msg) => {
    console.log("message: " + msg);
    socket.emit(
      "chat_message",
      "Sorry at the moment. We are still building the system. Kindly wait.."
    );
  });
});

server.listen(3010, () => {
  console.log("listening on *:3010");
});

function authenticateSocketConnection(socket) {
  const { token } = socket.handshake.auth;
  if (!token) return;
  let isVerified = false;
  let userId = "";
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      isVerified = false;
    }
    userId = decoded?.id;
    isVerified = userId ? true : false;
  });
  return { isVerified, userId };
}
