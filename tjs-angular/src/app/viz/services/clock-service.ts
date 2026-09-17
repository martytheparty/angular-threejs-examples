import { Service } from '@angular/core';

@Service()
export class ClockService {
    private startTime = 0;
    private pausedTime: number = 0;
    private isPaused: boolean = false;
    private period = 10;  // seconds... 

    constructor() {
        this.startTime = performance.now();
    }

    getAbsoluteElapsedMilliseconds(): number {
        return performance.now() - this.startTime;        
    }

    getElapsedMilliseconds(): number {
        if (this.isPaused) {
            return this.getPausedTime();
        }

        const elapsed = Math.round(this.getAbsoluteElapsedMilliseconds());
        return elapsed % (this.period * 1000);
    }

    getElapsedHundredsSeconds(): number {
        if (this.isPaused) {
            return this.getPausedTime();
        }

        const elapsedHundedsOfSeconds = Math.round(this.getAbsoluteElapsedMilliseconds()/10);
        return elapsedHundedsOfSeconds % (this.period * 100);
    }

    getElapsedTensSeconds(): number {
        if (this.isPaused) {
            return this.getPausedTime();
        }

        const elapsedHundedsOfSeconds = Math.round(this.getAbsoluteElapsedMilliseconds()/100);
        return elapsedHundedsOfSeconds % (this.period * 10);
    }

    getElapsedSeconds(): number {
        if (this.isPaused) {
            return this.getPausedTime();
        }

        const elapsedSeconds = Math.round(this.getAbsoluteElapsedMilliseconds()/1000);
        return elapsedSeconds % (this.period);
    }

    getPeriod(): number {
        return this.period;
    }

    setPeriod(period: number): void {
        this.period = period;
    }

    getPausedTime(): number {
        return this.pausedTime;
    }

    setPausedTime(pausedTime: number): void {
        this.pausedTime = pausedTime;
    }

    pause(): void {
        this.pausedTime = this.getElapsedMilliseconds();
        this.isPaused = true;
    }

    resume(): void {
        this.isPaused = false;
    }

}
