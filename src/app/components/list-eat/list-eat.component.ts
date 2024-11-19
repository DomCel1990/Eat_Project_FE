import { Component, inject, OnInit } from '@angular/core';
import { PlanDayService } from '../../services/plan-day.service';
import { Observable } from 'rxjs';
import { Planday } from '../../models/plan-day.model';
import { CommonModule } from '@angular/common';
import { CardEatListComponent } from '../card-eat-list/card-eat-list.component';

@Component({
  selector: 'app-list-eat',
  standalone: true,
  imports: [CommonModule, CardEatListComponent],
  templateUrl: './list-eat.component.html',
  styleUrl: './list-eat.component.css'
})
export class ListEatComponent implements OnInit{
  plnaDays$: Observable<Planday>;
  private plandayService = inject(PlanDayService);

  ngOnInit(): void {
    this.plnaDays$ = this.plandayService.plandayObs$;
  }
}
