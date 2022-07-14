let timerID;
let timerTime;
const audio = new Audio("./asset/alarm_sound.wav");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === "START_TIMER") {
        timerTime = new Date(request.when);
        if(!timerID){
            timerID = setTimeout(() => {
                console.log("end")
                audio.play();
            }, timerTime.getTime() - Date.now());
        }
    } else if (request.cmd === "GET_TIME") {
        console.log("GET_TIME Called. Time: " + `${timerTime}`);
        sendResponse({
            time:
                timerTime && new Date(timerTime).getTime() - Date.now() > 0
                    ? timerTime
                    : 0,
        });
    } else if (request.cmd === "STOP_TIME") {
        console.log("STOP_TIME Called");
        clearTimeout(timerID);
        timerID = null;
        sendResponse({ time: timerTime });
    } else if (request.cmd === "RESET_TIME") {
        console.log("RESET_TIME Called");
        clearTimeout(timerID);
        timerID = null;
    }
});
