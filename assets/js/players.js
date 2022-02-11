/* 유저 리스트 프론트 셋팅 */
import { disableCanvas, hideControls } from "./paint";

const board = document.getElementById("jsPBoard");

const addPlayers = players => {
    board.innerHTML = "";
    players.forEach(player => {
        const playerElement = document.createElement("span");
        playerElement.innerText = `${player.nickname}: ${player.points}`;
        board.appendChild(playerElement);
    });
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
    disableCanvas();
    hideControls();
};