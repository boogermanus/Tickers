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
  private done = false;
  private timer!: Observable<number>;
  
  private running = signal(false);
  public get Running(): Signal<boolean> {
    return this.running.asReadonly();
  }
  
  constructor() { }
}
