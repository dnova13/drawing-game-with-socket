import events from "./events";

const socketController = socket => {

    // socket broadcast 함수
    // 클라이언트 본인 제외하고 다른 애들한테 싱행된 이벤트 동작 보냄
    const broadcast = (event, data) => socket.broadcast.emit(event, data);

    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;

        // 새로운 유저가 접속했다고 2명이상의 타유저들에게 모두 알림
        broadcast(events.newUser, { nickname });
    });

    socket.on(events.disconnect, () => {

        // 다른 유저가 2명이상의 타유저들에게  퇴장햇다고 모두 알림.
        broadcast(events.disconnected, { nickname: socket.nickname });
    });
};

export default socketController;