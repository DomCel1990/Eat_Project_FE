import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

import { EatService } from '../../services/eat.service';
import { Step1Component } from "./step1/step1.component";
import { Step2Component } from './step2/step2.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-eat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    Step1Component,
    Step2Component
  ],
  providers: [EatService],
  templateUrl: './create-eat.component.html',
  styleUrl: './create-eat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEatComponent {

  private router = inject(Router);

  navigate() {
    this.router.navigate(['eat-day']);
  }
}
