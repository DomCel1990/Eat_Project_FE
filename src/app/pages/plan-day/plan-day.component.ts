import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DoughnutComponent } from '../../components/doughnut/doughnut.component';
import { PlanDayService } from '../../services/plan-day.service';
import { Observable } from 'rxjs';
import { Planday } from '../../models/plan-day.model';
import { EatService } from '../../services/eat.service';
import { AlimentoImage } from '../../models/alimento.model';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-plan-day',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    DoughnutComponent,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter(), EatService],
  templateUrl: './plan-day.component.html',
  styleUrl: './plan-day.component.css'
})
export class PlanDayComponent implements OnInit{
  form: FormGroup;
  planday$: Observable<Planday>;
  eatAll$: Observable<AlimentoImage[]>;

  private formBuilder = inject(FormBuilder);
  private planDayService = inject(PlanDayService);
  private eatService = inject(EatService);

  constructor() {
    this.eatAll$ = this.eatService.getAllEatsImage();
  }

  ngOnInit(): void {
    this.planDayService.getPlanDay().subscribe();

    

    this.setForm();
  }

  setForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      date: [new Date(), Validators.required],
      grammi: [null, Validators.required]
    });
  }

  onSubmit() {
    const {name, date, grammi} = this.form.value;
    const newDate = new Date(date).toISOString().slice(0, 10).replace(/-/g, '');

    this.planDayService.addPlanday(name, newDate, grammi).subscribe();   
  }
}
