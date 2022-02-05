/* 채팅창 이벤트 js */

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
    input.value = "";

    appendMsg(value);
};

if (sendMsg) {
    sendMsg.addEventListener("submit", handleSendMsg);
}