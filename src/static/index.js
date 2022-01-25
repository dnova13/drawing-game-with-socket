// 프론트에서 소켓 연결
const socket = io("/");

socket.on("hello", () => console.log("Somebody joined"));

setTimeout(() => socket.emit("helloGuys"), 2000);