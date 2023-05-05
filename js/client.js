const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageaInp");
const messageContainer = document.querySelector(".container");
let audio = new Audio('ting.mp3');
const append = (message, position) => {
  const newElement = document.createElement("div");
  newElement.innerText = message;
  newElement.classList.add("message");
  newElement.classList.add(position);
  messageContainer.append(newElement);
  if(position === 'left'){
    audio.play();
  }
};

const input = prompt("Enter your name to chat..");

socket.emit("new-user-joined", input);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = messageInput.value;
  append(`You : ${value}`, "right");
  socket.emit("send", value);
  messageInput.value = "";
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on('left', (name)=> {
    append(`${name} has left the chat`, 'left');
})
