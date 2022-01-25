// 프론트에서 소켓 연결
const socket = io("/");
let nick

function sendMsg(msg) {
    socket.emit("newMsg", { msg })
}

// 해당 클라이언트 닉네임 지정.
function setNickname(nickname) {
    socket.emit("setNickname", { nickname });
}

function handleMsgNoti(data) {
    const { msg, nickname } = data
    console.log(`${nickname}: ${msg}`);
}

socket.on('msgNoti', handleMsgNoti)