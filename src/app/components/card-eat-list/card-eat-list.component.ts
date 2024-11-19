import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { Alimento } from '../../models/alimento.model';
import { CaloriesPipe } from '../../pipes/calories.pipe';
import { GrammiPipe } from '../../pipes/grammi.pipe';

@Component({
  selector: 'app-card-eat-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CaloriesPipe, GrammiPipe],
  templateUrl: './card-eat-list.component.html',
  styleUrl: './card-eat-list.component.css'
})
export class CardEatListComponent {
  @Input() alimento: Alimento;
}
