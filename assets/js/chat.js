/* 채팅창 이벤트 js */

import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

// 메세지 붙여넣기
const appendMsg = (text, nickname) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="author ${nickname ? "out" : "self"}">${nickname ? nickname : "You"
        }:</span> ${text}
    `;
    messages.appendChild(li);
};

// 메세지 서버 전달 및 메세지 프론트 동작 실행
const handleSendMsg = event => {

    event.preventDefault();

    const input = sendMsg.querySelector("input");
    const { value } = input;

    // 해당 소켓 객체를 가져와서 메세지값 웹소켓 서버에 송출
    getSocket().emit(window.events.sendMsg, { message: value });

    input.value = "";
    appendMsg(value);
};

// 서버쪽 소켓에 최신 메세지 전달.
export const handleNewMessage = ({ message, nickname }) =>
    appendMsg(message, nickname);

if (sendMsg) {
    sendMsg.addEventListener("submit", handleSendMsg);
}