import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFilled } from "./paint";
import {
    handlePlayerUpdate,
    handleGameStarted,
    handleLeaderNotif,
    handleGameEnded
} from "./players";

let socket = null;

export const getSocket = () => socket;

// absocket 함수에 넣는 임의 변수로. 그냥 asocket 등으로 아무거나 해도 상관없음
export const updateSocket = aSocket => (socket = aSocket);

// 프론트 쪽 소켓 초기설정 셋팅.
export const initSockets = aSocket => {
    const { events } = window;

    updateSocket(aSocket);

    socket.on(events.newUser, handleNewUser);
    socket.on(events.disconnected, handleDisconnected);
    socket.on(events.newMsg, handleNewMessage);
    socket.on(events.beganPath, handleBeganPath);
    socket.on(events.strokedPath, handleStrokedPath);
    socket.on(events.filled, handleFilled);
    socket.on(events.playerUpdate, handlePlayerUpdate);
    socket.on(events.gameStarted, handleGameStarted);
    socket.on(events.leaderNotif, handleLeaderNotif);
    socket.on(events.gameEnded, handleGameEnded);
};