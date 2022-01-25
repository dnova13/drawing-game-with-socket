import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
    console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = new socketIO.Server(server);

let sockets = [];

io.on("connection", socket => {

    // 클라에서 emit 한 메세지 받음.
    socket.on("newMsg", (data) => {

        socket.broadcast.emit("msgNoti", {
            msg: data.msg,
            nickname: socket.nickname || "Anon"
        })
    });

    // 클라 단에서 보낸 닉네임 정보를 socket 객체에 등록
    socket.on("setNickname", ({ nickname }) => {
        socket.nickname = nickname;
    });
});