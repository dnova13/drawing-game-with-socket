/* 소켓 이벤트 종류 지정 */

const events = {
    setNickname: "setNickname",
    newUser: "newUser",
    disconnect: "disconnect",
    disconnected: "disconnected",
    sendMsg: "sendMsg",
    newMsg: "newMsg",
    beginPath: "beginPath",
    strokePath: "strokePath",
    beganPath: "beganPath",
    strokedPath: "strokedPath",
    fill: "fill",
    filled: "filled",
    playerUpdate: "playerUpdate",
    gameStarted: "gameStarted",
    leaderNotif: "leaderNotif",
    gameEnded: "gameEnded",
    gameStarting: "gameStarting",
    timeCount: "timeCount"
};

export default events;