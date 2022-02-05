import { handleNewUser } from "./notifications";

let socket = null;


export const getSocket = () => socket;

export const updateSocket = aSocket => (socket = aSocket);

export const initSockets = aSocket => {
    const { events } = window;

    updateSocket(aSocket);

    // 새로운 유저 등록
    aSocket.on(events.newUser, handleNewUser);
};