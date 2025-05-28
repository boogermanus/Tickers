import { Injectable, Signal, signal } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  public static readonly COUNT_UP = 'U';
  public static readonly COUNT_DOWN = 'D'

  private ticks = signal(0);
  public get Ticks(): Signal<number> {
    return this.ticks.asReadonly();
  }

  private timerSubscription: Subscription = new Subscription();
  private timer!: Observable<number>;

  private done = signal(true);
  public get Done(): Signal<boolean> {
    return this.done.asReadonly();
  }

  private running = signal(false);
  public get Running(): Signal<boolean> {
    return this.running.asReadonly();
  }

  private minutes = signal('00');
  public get Minutes(): Signal<string> {
    return this.minutes.asReadonly();
  }

  private seconds = signal('00');
  public get Seconds(): Signal<string> {
    return this.seconds.asReadonly();
  }

  private showDone = signal(false);
  public get ShowDone(): Signal<boolean> {
    return this.showDone.asReadonly();
  }

  private mode!: string;
  private target!: number;

  constructor() { }

  public start(): void {
    this.running.set(true);
    this.done.set(false);

    this.timer = timer(0, 1000);
    this.timerSubscription = this.timer.subscribe({
      next: () => {this.updateTicks()}
    })
  }

  public reset(ticks: number, mode: string): void {

    this.showDone.set(false);
    this.ticks.set(0);
    this.target = ticks;

    if(mode === TickerService.COUNT_DOWN) {
      this.ticks.set(ticks);
      this.target = 0;
    }
    this.setMinutesAndSeconds()

    this.mode = mode;
  }

  public stop(): void {
    this.running.set(false);
    this.unsubscribe();
  }

  private unsubscribe(): void {
    if(!this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }
  }

  private updateTicks(): void {
    let finished = false;

    if(this.mode === TickerService.COUNT_UP) {
      this.ticks.update(value => value + 1);
    }

    if(this.mode === TickerService.COUNT_DOWN) {
      this.ticks.update(value => value - 1);
    }

    this.setMinutesAndSeconds();

    if(this.ticks() === this.target) {
      finished = true;
    }

    if(finished) {
      this.done.set(true);
      this.running.set(false);
      this.showDone.set(true);
      this.unsubscribe();
    }
  }

  private formatNumber(number: number): string {
    if(number < 10) {
      return `0${number}`;
    }
    else {
      return number.toString();
    }
  }

  private setMinutesAndSeconds(): void {
    this.minutes.set(this.formatNumber(Math.floor(this.ticks() / 60)));
    this.seconds.set(this.formatNumber(this.ticks() % 60));
  }
}
