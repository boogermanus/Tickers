import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss'
})
export class TickerComponent {

}
