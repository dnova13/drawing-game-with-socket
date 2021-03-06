/* 유저 리스트 프론트 셋팅 */
import {
    disableCanvas,
    hideControls,
    enableCanvas,
    showControls,
    resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const timeCount = document.getElementById("jsCount");

const addPlayers = players => {
    board.innerHTML = "";
    players.forEach(player => {
        const playerElement = document.createElement("span");
        playerElement.innerText = `${player.nickname}: ${player.points}`;
        board.appendChild(playerElement);
    });
};

const setNotifs = text => {
    notifs.innerText = "";
    notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = (endTime) => {
    console.log(endTime)
    setNotifs("");
    disableCanvas();
    hideControls();
    enableChat();

    timeCount.innerText = endTime
};

export const handleLeaderNotif = ({ word }) => {
    enableCanvas();
    showControls();
    disableChat();
    notifs.innerText = `You are the leader, paint: ${word}`;
};

export const handleGameEnded = () => {
    setNotifs("Game ended.");
    timeCount.innerText = ""
    disableCanvas();
    hideControls();
    resetCanvas();
};

export const handleTimeCount = (time) => {
    timeCount.innerText = time
};

export const handleGameStarting = () => setNotifs("Game will start soon");