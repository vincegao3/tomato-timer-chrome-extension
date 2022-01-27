class Timer {
    constructor(duration, displayLocation) {
        this.defaultDuration = duration;
        this.duration = duration;
        this.displayLocation = displayLocation;
        this.timerInterval = null;
    }

    setDuration(duration) {
        this.defaultDuration = duration;
    }

    display() {
        let minute = Math.trunc(this.duration / 60);
        let second = Math.trunc(this.duration % 60);
        this.displayLocation.innerHTML =
            (minute > 10 ? minute : "0" + minute) +
            ":" +
            (second > 10 ? second : "0" + second);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (duration > 0) {
                this.duration--;
                display();
            } else {
                alert("Time up");
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        display();
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.duration = this.defaultDuration;
        display();
    }
}
