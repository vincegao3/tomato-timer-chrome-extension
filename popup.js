import Timer from "./Timer";

let defaultDuration = 25 * 60 * 1000;
let clockHtml = document.getElementById("clock");
let timer = new Timer(defaultDuration, clockHtml);
timer.display();
// let storageDefaultDuration = chrome.storage.sync.get(
//     "defaultTime",
//     ({ defaultTime }) => {}
// );

document.getElementById("workBtn").addEventListener("click", onClickWorkButton);
document.getElementById("restBtn").addEventListener("click", onClickRestButton);
document
    .getElementById("startBtn")
    .addEventListener("click", onClickStartButton);
document.getElementById("stopBtn").addEventListener("click", onClickStopButton);
document
    .getElementById("resetBtn")
    .addEventListener("click", onClickResetButton);

function onClickWorkButton() {
    timer.setDuration(25 * 60 * 1000);
}

function onClickRestButton() {
    timer.setDuration(5 * 60 * 1000);
}

function onClickStartButton() {
    timer.startTimer();
}

function onClickStopButton() {
    timer.stopTimer();
}

function onClickResetButton() {
    timer.resetTimer();
}
