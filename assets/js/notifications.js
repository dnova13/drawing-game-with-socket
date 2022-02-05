
// const notifications = document.getElementById("jsNotifications");
const body = document.querySelector("body");

// 알림 프론트 이벤트 동작 함수
const fireNotification = (text, color) => {
    const notification = document.createElement("div");

    notification.innerText = text;
    notification.style.backgroundColor = color;
    notification.className = "notification";

    // notifications.appendChild(notification);
    body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) =>
    // 입장할때 프론트 이벤트 실행
    fireNotification(`${nickname} just joined!`, "rgb(0, 122, 255)");

export const handleDisconnected = ({ nickname }) =>
    // 퇴장할때 프론트 이벤트 실행
    fireNotification(`${nickname} just left!`, "rgb(255, 149, 0)");