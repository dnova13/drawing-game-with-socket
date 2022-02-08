import events from "./events";

const socketController = socket => {

    // socket broadcast 함수
    // 클라이언트 본인 제외하고 다른 애들한테 싱행된 이벤트 동작 보냄
    const broadcast = (event, data) => socket.broadcast.emit(event, data);

    // 닉네임 셋팅.
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;

        // 새로운 유저가 접속했다고 2명이상의 타유저들에게 모두 알림
        broadcast(events.newUser, { nickname });
    });

    // 연결 해제
    socket.on(events.disconnect, () => {

        // 다른 유저가 2명이상의 타유저들에게  퇴장햇다고 모두 알림.
        broadcast(events.disconnected, { nickname: socket.nickname });
    });


    // 메세지 전송에 대한 소켓 전달
    socket.on(events.sendMsg, ({ message }) => {
        broadcast(events.newMsg, { message, nickname: socket.nickname });
    });

    socket.on(events.sendMsg, ({ message }) =>
        broadcast(events.newMsg, { message, nickname: socket.nickname })
    );

    /// 마우스 포인트 그림 시작위치 브로드 캐스팅
    socket.on(events.beginPath, ({ x, y }) =>
        broadcast(events.beganPath, { x, y })
    );

    /// 그림 그릴 경우 타 소켓 서버에 브로드 캐스팅
    socket.on(events.strokePath, ({ x, y }) => {
        broadcast(events.strokedPath, { x, y });
        console.log(x, y);
    });
};

export default socketController;