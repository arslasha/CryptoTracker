// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Пользователь подключен");

    socket.on("set_username", ({ username }) => {
        socket.data.username = username;
        socket.broadcast.emit("system", {
            text: `${username} присоединился к чату`,
            timestamp: new Date().toISOString()
        });
    });

    socket.on("message", ({ text }) => {
        io.emit("message", {
            text,
            username: socket.data.username,
            timestamp: new Date().toISOString()
        });
    });

    socket.on("disconnect", () => {
        if (socket.data.username) {
            io.emit("system", {
                text: `${socket.data.username} вышел из чата`,
                timestamp: new Date().toISOString()
            });
        }
    });
});

server.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});

