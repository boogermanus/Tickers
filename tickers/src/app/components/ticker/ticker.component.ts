import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TickerService } from '../../services/ticker.service';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss'
})
export class TickerComponent {

  public ticks: number = 1;
  public mode: string = 'D';
  public stopButtonDisabled = true;
  public startButtonDisabled = false;

  public get Minutes(): Signal<string> {
    return this.service.Minutes;
  }

  public get Seconds(): Signal<string> {
    return this.service.Seconds;
  }

  constructor(private readonly service: TickerService) { }

  public reset(): void {
    this.service.reset(1, TickerService.COUNT_DOWN);
    this.ticks = this.service.Ticks();
    this.mode = TickerService.COUNT_DOWN;
  }

  public start(): void {
    if (this.service.Done()) {
      this.service.reset(this.ticks, this.mode);
    }
    this.service.start();
    this.stopButtonDisabled = false;
    this.startButtonDisabled = true;
  }

  public stop(): void {
    this.service.stop();
  }
}
