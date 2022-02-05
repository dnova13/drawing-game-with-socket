import events from "./events";

const socketController = socket => {

    // 닉네임 셋팅 이벤트
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        socket.broadcast.emit(events.newUser, { nickname });
    });
};