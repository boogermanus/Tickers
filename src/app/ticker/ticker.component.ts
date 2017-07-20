import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import {Subscription} from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit, OnDestroy {
  @Input() mode: string;
  @Input() from: number;
  emitter: EventEmitter<boolean>;
  constructor() { }
  ticks:number = 0;
  timerSubscription: Subscription;
  done:boolean = false;

  ngOnInit() {

    if(this.mode == "D") {
      this.ticks = this.from;
    }
    let timer = Observable.timer(2000,1000);
    this.timerSubscription = timer.subscribe((t) => {
      this.updateTicks(t);
    })
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  updateTicks(pNumber:number) {
    if(this.mode == "U") {
      this.ticks = pNumber
    }
    else {
      this.ticks--;
      if(this.ticks == 0) {
        this.timerSubscription.unsubscribe();
        this.done = true;
      }
    }
  }

}
