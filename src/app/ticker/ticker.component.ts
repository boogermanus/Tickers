import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit, OnDestroy {

  constructor() { }
  ticks:number = 0;
  timerSubscription: Subscription;

  ngOnInit() {
    let timer = Observable.timer(2000,1000);
    this.timerSubscription = timer.subscribe(t => this.ticks = t)
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

}
