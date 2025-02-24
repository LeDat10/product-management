// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;

        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = "";
        };
    });
}

// End CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const body = document.querySelector(".chat .inner-body");
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const div = document.createElement("div");
    let htmlfullName = "";

    if (myId === data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        div.classList.add("inner-incoming");
        htmlfullName = `<div class="inner-name">${data.fullName}</div>`;
    }


    div.innerHTML = `
                        ${htmlfullName}
                        <div class="inner-content">${data.content}</div>
                    `;
    body.appendChild(div);
});
// End SERVER_RETURN_MESSAGE
