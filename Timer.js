export default class Timer {
    constructor(duration, displayLocation, clockObject) {
        this.defaultDuration = duration;
        this.duration = duration;
        this.displayLocation = displayLocation;
        this.clockObject = clockObject;
        this.clockObject.style.animationDuration = this.defaultDuration + "s";
        this.timerInterval = null;
    }

    setDuration(duration) {
        this.stopTimer();
        this.defaultDuration = duration;
        this.duration = duration;
        this.clockObject.style.animationDuration =
            this.defaultDuration/1000 + "s";
    }

    display() {
        let minute = Math.trunc(this.duration / 60 / 1000);
        let second = Math.trunc(this.duration /1000 % 60);
        this.displayLocation.innerHTML =
            (minute > 10 ? minute : "0" + minute) +
            ":" +
            (second > 10 ? second : "0" + second);
    }

    startTimer() {
        this.clockObject.classList.add("timerAnimation")
        this.clockObject.style.webkitAnimationPlayState = "running";
        this.timerInterval = setInterval(() => {
            if (this.duration > 0) {
                this.duration-=1000;
                this.display();
            } else {
                // TODO Create a Sound Alert
                this.clockObject.style.animation = "none";
                clearInterval(this.timerInterval);
                alert("Time up");
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.clockObject.style.webkitAnimationPlayState = "paused";
        this.display();
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.duration = this.defaultDuration;
        this.clockObject.classList.remove("timerAnimation")
        this.clockObject.style.webkitAnimationDuration =
            this.defaultDuration/1000 + "s";
        this.display();
    }
}
