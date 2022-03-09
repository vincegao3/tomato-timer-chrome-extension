import Timer from "./Timer.js";

// TODO get time from storage
let defaultDuration = 25 * 60 * 1000;
let clockHtml = document.getElementById("time");
let timer = new Timer(defaultDuration, clockHtml);
timer.display();

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
    timer.display();
}

function onClickRestButton() {
    timer.setDuration(5 * 60 * 1000);
    timer.display();
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
