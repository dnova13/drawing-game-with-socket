import { initSockets } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickname = localStorage.getItem(NICKNAME);




// 소켓에 입력한 닉네임 정보 전달.
const logIn = nickname => {
    const socket = io("/");
    socket.emit(window.events.setNickname, { nickname });

    initSockets(socket);
};


// 닉네임에 따른 로그인 유무 체크
if (nickname === null) {
    body.className = LOGGED_OUT;
} else {
    body.className = LOGGED_IN;
    logIn(nickname);
}

// 닉네임 폼에서 입력된 닉네임 서버 전달
const handleFormSubmit = e => {
    e.preventDefault();

    const input = loginForm.querySelector("input");
    const { value } = input;

    input.value = "";

    // 닉네임 로컬스토리지 저장
    localStorage.setItem(NICKNAME, value);

    body.className = LOGGED_IN;

    // 소켓에 닉네임 정보 전달
    logIn(value);
};

if (loginForm) {
    loginForm.addEventListener("submit", handleFormSubmit);
}