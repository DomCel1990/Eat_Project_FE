import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { AlimentoImage } from '../../models/alimento.model';
import { CaloriesPipe } from '../../pipes/calories.pipe';
import { GrammiPipe } from '../../pipes/grammi.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CaloriesPipe, MatGridListModule, GrammiPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input({required: true}) eat: AlimentoImage;

}
