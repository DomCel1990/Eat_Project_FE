import { Component, inject, OnInit } from '@angular/core';
import { EatService } from '../../services/eat.service';
import { Observable } from 'rxjs';
import { AlimentoImage, AlimentoImagePeageble } from '../../models/alimento.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-eat-day',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    MatGridListModule, 
    MatPaginatorModule,
    MatSlideToggleModule,
  ],
  providers: [EatService],
  templateUrl: './eat-day.component.html',
  styleUrl: './eat-day.component.css', 

})
export class EatDayComponent implements OnInit{
  eatAll$: Observable<AlimentoImage[]>;
  eatAllPeageble$: Observable<AlimentoImagePeageble>;
  
  private eatService = inject(EatService);

  ngOnInit(): void {

    this.eatAllPeageble$ = this.eatService.getAllEatsPaginate(0, 6);

  }

  handlePageEvent(event: PageEvent) {
    this.eatAllPeageble$ = this.eatService.getAllEatsPaginate(event.pageIndex, event.pageSize);
  }

}
