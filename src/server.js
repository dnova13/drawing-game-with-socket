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

// 소켓 연결. 프론트에서 소켓 연결이 확인 되면 
//  console.log("somebody connnect") 
io.on("connection", socket => {
    console.log("somebody connnect")
    sockets.push(socket.id);
});