class Clock {
    constructor(template, id) {
        this.template = template;
        this.display = document.getElementById(id);
        this.second = 0;
        this.minute = 0;
        this.isRunning = false;
    }
    
    stopWatch() {
        if (this.second === 60) {
            this.minute++;
            this.second = 0;
        }

        if (this.minute === 60) {
            this.hour++;
            this.minute = 0;
            this.second = 0;
        }

        let secString = this.second;
        let minString = this.minute;

        if (this.minute < 10) {
            minString = "0" + this.minute;
        }

        if (this.second < 10) {
            secString = "0" + this.second;
        }
        let output = this.template
            .replace('m', minString)
            .replace('s', secString);
        this.display.innerHTML = output;

        this.second++;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.stopWatch();
            this.timer = setInterval(() => {
                this.stopWatch();
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timer);
            this.isRunning = false;
            this.pauseMinute = this.minute;
            this.pauseSecond = this.second;
        }
    }

    stop() {
        clearInterval(this.timer);
        this.isRunning = false;
        this.minute = 0;
        this.second = 0;
        this.display.innerHTML = '00:00';
    }

    static startAll() {
        Clock.instances.forEach((clock) => {
            clock.start();
        });
    }

    static stopAll() {
        Clock.instances.forEach((clock) => {
            clock.stop();
        });
    }
}

let stopwatch = new Clock('m:s', "clock-1");
let stopwatch2 = new Clock('m:s', "clock-2");
let stopwatch3 = new Clock('m:s', "clock-3");
let stopwatch4 = new Clock('m:s', "clock-4");
let stopwatch5 = new Clock('m:s', "clock-5");

Clock.instances = [];

Clock.instances.push(stopwatch, stopwatch2, stopwatch3, stopwatch4, stopwatch5);
