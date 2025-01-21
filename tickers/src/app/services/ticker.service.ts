import { Injectable, Signal, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

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

  private done = signal(false);
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

  private mode!: string;
  private target!: number;

  constructor() { }

  public start(): void {
    this.running.set(true);
    this.done.set(false);
  }

  public config(ticks: number, mode: string): void {

    this.ticks.set(0);
    this.target = ticks;

    if(mode === TickerService.COUNT_DOWN) {
      this.ticks.set(ticks);
      this.target = 0;
    }
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
}
