import { Component, inject, OnInit } from '@angular/core';
import { EatService } from '../../services/eat.service';
import { Observable } from 'rxjs';
import { Alimento, AlimentoImage } from '../../models/alimento.model';
import { CommonModule } from '@angular/common';
import { Image } from "../../models/image.model";
import { CardComponent } from '../../components/card/card.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-eat-day',
  standalone: true,
  imports: [CommonModule, CardComponent, MatGridListModule],
  providers: [EatService],
  templateUrl: './eat-day.component.html',
  styleUrl: './eat-day.component.css'
})
export class EatDayComponent implements OnInit{
  eatAll$: Observable<AlimentoImage[]>;
  
  private eatService = inject(EatService);

  ngOnInit(): void {
    this.eatAll$ = this.eatService.getAllEatsImage();
  }

}
