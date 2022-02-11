import events from "./events";
import { setInterval } from "timers";
import { chooseWord } from "./words";

// 소켓에 들어온 클라이언트 정보를 담기 위해 배열 선언
// 소켓 정보를 계속 유지하기 위헤 메모리 통해 저장.
let sockets = [];

let inProgress = false;
let word = null;

// 그림 그리는 사람 랜덤 택
const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {

    // socket broadcast 함수
    // 클라이언트 본인 제외하고 다른 애들한테 싱행된 이벤트 동작 보냄
    const broadcast = (event, data) => socket.broadcast.emit(event, data);

    // io를 통해서 자기 자신 소켓을 포함한 모든 유저에게 어떤한 정보 업데이트를 알림.
    // 나 자신을 포함해야 하므로 boradcast는 사용 못함.
    const superBroadcast = (event, data) => io.emit(event, data);

    // 정보를 업데이트할때 마다 소켓에 접속된 모든 유저에 알려줌.
    const sendPlayerUpdate = () =>
        superBroadcast(events.playerUpdate, { sockets });

    // 게임 시작 셋팅
    const startGame = () => {
        /// 시작할때
        if (inProgress === false) {
            inProgress = true;
            const leader = chooseLeader();
            word = chooseWord();

            // ws 서버에서 to() 를 특정 소켓 아이디에 메세지 보냄.
            // 그림 그릴 사람에게 그려야 워드 전달.
            io.to(leader.id).emit(events.leaderNotif, { word });
            superBroadcast(events.gameStarted);
        }
    };

    // 게임 종료 알림
    const endGame = () => {
        inProgress = false;
    };

    // 닉네임 셋팅.
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname

        // 소켓 배열에 유저 정보를 담음.
        sockets.push({ id: socket.id, points: 0, nickname: nickname });

        // 새로운 유저가 접속했다고 2명이상의 타유저들에게 모두 알림
        broadcast(events.newUser, { nickname });
        sendPlayerUpdate();

        console.log(sockets)

        if (sockets.length === 1) {
            startGame();
        }
    });

    // 연결 해제
    socket.on(events.disconnect, () => {

        // console.log(sockets)

        // 배열 필터 함수를 이용하여 
        // 연결 해제한 아이디를 거름. 즉 연결한 아이디만 다시 배열로 모음.
        sockets = sockets.filter(aSocket => {
            console.log(aSocket.id, socket.id)
            return aSocket.id !== socket.id
        });

        // console.log(sockets)

        if (sockets.length === 1) {
            endGame();
        }

        // 다른 유저가 2명이상의 타유저들에게  퇴장햇다고 모두 알림.
        broadcast(events.disconnected, { nickname: socket.nickname });
        sendPlayerUpdate();
    });


    // 메세지 전송에 대한 소켓 전달
    socket.on(events.sendMsg, ({ message }) => {
        broadcast(events.newMsg, { message, nickname: socket.nickname });
    });

    /// 마우스 포인트 그림 시작위치 좌표값 브로드 캐스팅
    socket.on(events.beginPath, ({ x, y }) =>
        broadcast(events.beganPath, { x, y })
    );

    /// 그림 그릴 경우 전송된 좌표값, 색 정보 타 소켓 서버에 브로드 캐스팅
    socket.on(events.strokePath, ({ x, y, color }) => {
        console.log(sockets)
        broadcast(events.strokedPath, { x, y, color });
    });

    // 그림 채우기 경우, 정보 브로드 캐스팅
    socket.on(events.fill, ({ color }) => {
        broadcast(events.filled, { color });
    });
};

// setInterval(() => console.log(sockets), 3000)

export default socketController;