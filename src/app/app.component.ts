import { Component } from '@angular/core';
import { TickerComponent } from "./components/ticker/ticker.component";

@Component({
    selector: 'app-root',
    imports: [
        TickerComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tickers';
}
