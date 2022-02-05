import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4001;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) =>
    res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () =>
    console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = new socketIO.Server(server);

/// 코드 리펙토링 socketController.js 에서 setnicknmae 등 함수 관리
io.on("connection", socket => socketController(socket));
