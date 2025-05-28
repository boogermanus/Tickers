import {Component, effect, Signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TickerService} from '../../services/ticker.service';

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
    MatTooltipModule,
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

  public get ShowDone(): Signal<boolean> {
    return this.service.ShowDone;
  }

  constructor(private readonly service: TickerService) {
    effect(() => {
      if (this.ShowDone()) {
        this.toggleButtonState(true);
        this.stopButtonDisabled = true;
      }
    })
    this.service.reset(this.ticks, this.mode);
  }

  public reset(): void {
    this.service.reset(1, TickerService.COUNT_DOWN);
    this.ticks = 1;
    this.mode = TickerService.COUNT_DOWN;
    this.toggleButtonState(false);
  }

  public start(): void {
    if (this.service.Done()) {
      this.service.reset(this.ticks, this.mode);
    }
    this.service.start();
    this.toggleButtonState(true);
  }

  public stop(): void {
    this.service.stop();
    this.toggleButtonState(false)
  }

  private toggleButtonState(state: boolean): void {
    this.startButtonDisabled = state;
    this.stopButtonDisabled = !state;
  }

  public valueToggle(): void {
    this.startButtonDisabled = this.ticks <= 0;
    this.service.reset(this.ticks, this.mode);
  }
}
