export default class Timer {
    constructor(duration, displayLocation, clockObject) {
        this.getBackgroundTime().then((result) => {
            if (result) {
                this.defaultDuration = duration;
                this.displayLocation = displayLocation;
                this.clockObject = clockObject;
                this.duration = new Date(result).getTime() - Date.now();
                this.clockObject.style.animationDuration = this.duration + "s";
                this.timerInterval = null;
                this.reqAnimationId = null;
                this.startTimer()
            } else {
                this.defaultDuration = duration;
                this.duration = duration;
                this.displayLocation = displayLocation;
                this.clockObject = clockObject;
                this.clockObject.style.animationDuration =
                    this.defaultDuration + "s";
                this.reqAnimationId = null;
                this.timerInterval = null;
            }
            this.display()
        });
    }

    async getBackgroundTime() {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ cmd: "GET_TIME" }, (response) => {
                if (response) {
                    resolve(response.time);
                } else {
                    reject("");
                }
            });
        });
    }

    setDuration(duration) {
        this.stopTimer();
        this.defaultDuration = duration;
        this.duration = duration;
        this.clockObject.style.animationDuration =
            this.defaultDuration / 1000 + "s";
    }

    display() {
        if (this.displayLocation) {
            let minute = Math.trunc(this.duration / 60 / 1000);
            let second = Math.trunc((this.duration / 1000) % 60);
            this.displayLocation.innerHTML =
                (minute >= 10 ? minute : "0" + minute) +
                ":" +
                (second >= 10 ? second : "0" + second);
        }
    }

    startTime(duration) {
        let endDate = this.addTimeToDate(duration);
        chrome.runtime.sendMessage({ cmd: "START_TIMER", when: endDate });
    }

    stopTime() {
        chrome.runtime.sendMessage({ cmd: "STOP_TIME" });
    }

    resetTime() {
        chrome.runtime.sendMessage({ cmd: "RESET_TIME" });
    }

    startTimer() {
        this.clockObject.classList.add("timerAnimation");
        this.clockObject.style.webkitAnimationPlayState = "running";
        this.startTime(this.duration);
        this.timerInterval = setInterval(() => {
            if (this.duration > 0) {
                this.duration -= 1000;
                this.startAnimation();
            } else {
                this.clockObject.style.animation = "none";
                clearInterval(this.timerInterval);
                alert("Time up");
                this.stopAnimation();
                resetTimer();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.clockObject.style.webkitAnimationPlayState = "paused";
        this.display();
        this.stopTime();
    }

    startAnimation(){
        this.reqAnimationId = requestAnimationFrame(this.display.bind(this));
    }
    stopAnimation(){
        cancelAnimationFrame(this.reqAnimationId);
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.duration = this.defaultDuration;
        this.clockObject.classList.remove("timerAnimation");
        this.clockObject.style.webkitAnimationDuration =
            this.defaultDuration / 1000 + "s";
        this.display();
        this.resetTime();
        this.stopAnimation();
    }

    addTimeToDate(duration) {
        let now = new Date();
        return new Date(now.getTime() + duration);
    }
}
