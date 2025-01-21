import { Component } from '@angular/core';
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

  constructor(private readonly service: TickerService) {}

  public reset(): void  {
    this.service.reset(1, TickerService.COUNT_DOWN);
    this.ticks = this.service.Ticks();
    this.mode = TickerService.COUNT_DOWN;
  }
}
