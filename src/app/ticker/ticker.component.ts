import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Subscription} from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit, OnDestroy {
  mode: string = "D"; //count up
  from: number;
  constructor() { }
  ticks:number = 0;
  timerSubscription: Subscription;
  done:boolean = false;
  timer:Observable<number>;

  ngOnInit() {

  }

  ngOnDestroy() {
    if(!this.timerSubscription.closed)
      this.timerSubscription.unsubscribe();
  }

  updateTicks(pNumber:number) {
    let finished = false;
    if(this.mode == "U") {
      this.ticks = pNumber
      
      if(this.ticks == this.from)
        finished = true;
    }
    else {
      this.ticks--;
      if(this.ticks == 0) {
        finished = true;
      }
    }

    if(finished) {
      this.timerSubscription.unsubscribe();
      this.done = true;
    }
  }

  start() {
    this.done = false;
    if(this.mode == "D")
      this.ticks = this.from + 1;

    this.timer = Observable.timer(0, 1000);
    this.timerSubscription = this.timer.subscribe((t) => {
      this.updateTicks(t);
    })
  }
}
