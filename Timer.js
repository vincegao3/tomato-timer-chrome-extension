export default class Timer {
    constructor(duration, displayLocation) {
        this.defaultDuration = duration;
        this.duration = duration;
        this.displayLocation = displayLocation;
        this.timerInterval = null;
    }

    setDuration(duration) {
        this.stopTimer()
        this.defaultDuration = duration;
        this.duration = duration;
    }

    display() {
        let minute = Math.trunc(this.duration / 60 /1000);
        let second = Math.trunc(this.duration % 60);

        this.displayLocation.innerHTML =
            (minute > 10 ? minute : "0" + minute) +
            ":" +
            (second > 10 ? second : "0" + second);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.duration > 0) {
                this.duration--;
                this.display();
            } else {
                alert("Time up");
                // TODO Create a Sound Alert
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.display();
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.duration = this.defaultDuration;
        this.display();
    }
}
