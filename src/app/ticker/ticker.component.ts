import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Subscription} from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit, OnDestroy {
  @Input()mode: string = "D"; //count up
  @Input()from: number;
  constructor() { }
  ticks:number = 0;
  minutes:string = "00";
  seconds:string = "00";
  timerSubscription: Subscription;
  done:boolean = false;
  timer:Observable<number>;
  started:boolean = false;

  ngOnInit() {

  }

  ngOnDestroy() {
    if(!this.timerSubscription.closed)
      this.timerSubscription.unsubscribe();
  }

  updateTicks(pNumber:number) {
    let finished = false;
    if(this.mode == "U") {
      this.ticks++
      if(this.ticks == this.from)
        finished = true;
    }
    
    if(this.mode == "D") {
      this.ticks--;
      if(this.ticks == 0) {
        finished = true;
      }
    }

    this.minutes = this.formatNumber(Math.floor(this.ticks/60));
    this.seconds = this.formatNumber(this.ticks % 60);

    if(finished) {
      this.unsuscribe()
      this.done = true;
      this.started = false;
    }

  }

  start() {
    this.started = true;
    this.done = false;
    if(this.mode == "D") {
      if(this.ticks == 0)
        this.ticks = this.from + 1;
    }

    this.timer = Observable.timer(0, 1000);
    this.timerSubscription = this.timer.subscribe((t) => {
      this.updateTicks(t);
    })
  }

  stop() {
    this.started = false;
    this.done = false;
    this.unsuscribe();
  }

  private unsuscribe() {
    if(!this.timerSubscription.closed)
      this.timerSubscription.unsubscribe();
  }
  
  private formatNumber(pNumber:number) {
    if(pNumber < 10) {
      return "0" + pNumber.toString();
    }
    else {
      return pNumber.toString();
    }
  }
}
