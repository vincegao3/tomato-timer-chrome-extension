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
        console.log(this.defaultDuration + "s")
        this.clockObject.style.animationDuration =
            this.defaultDuration/1000 + "s";
    }

    display() {
        let minute = Math.trunc(this.duration / 60 / 1000);
        let second = Math.trunc(this.duration /1000 % 60);
        console.log(this.duration)
        this.displayLocation.innerHTML =
            (minute > 10 ? minute : "0" + minute) +
            ":" +
            (second > 10 ? second : "0" + second);
    }

    startTimer() {
        this.clockObject.style.webkitAnimationPlayState = "running";
        this.timerInterval = setInterval(() => {
            if (this.duration > 0) {
                this.duration-=1000;
                this.display();
            } else {
                alert("Time up");
                // TODO Create a Sound Alert
                this.clockObject.style.webkitAnimationPlayState = "paused";
                clearInterval(this.timerInterval);
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
        this.clockObject.style.webkitAnimationPlayState = "paused";
        this.clockObject.style.webkitAnimationDuration =
            this.defaultDuration/1000 + "s";
        this.display();
    }
}
