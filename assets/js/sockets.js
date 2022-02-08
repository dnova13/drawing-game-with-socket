import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleStrokedPath } from "./paint";

let socket = null;

export const getSocket = () => socket;

// absocket 함수에 넣는 임의 변수로. 그냥 asocket 등으로 아무거나 해도 상관없음
export const updateSocket = aSocket => (socket = aSocket);

// 프론트 쪽 소켓 초기설정 셋팅.
export const initSockets = aSocket => {
    const { events } = window;

    updateSocket(aSocket);

    aSocket.on(events.newUser, handleNewUser);
    aSocket.on(events.disconnected, handleDisconnected);
    aSocket.on(events.newMsg, handleNewMessage);
    aSocket.on(events.beganPath, handleBeganPath);
    aSocket.on(events.strokedPath, handleStrokedPath);
};