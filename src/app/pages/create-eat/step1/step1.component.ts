import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EatService } from '../../../services/eat.service';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';
import { Alimento } from '../../../models/alimento.model';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    CommonModule, 
    MatStepperModule, 
    MatProgressBarModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    FileUploadComponent],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css',
})
export class Step1Component implements OnInit {
  form!: FormGroup;
  eatName: string;
  isCreate = true;

  private formBuld = inject(FormBuilder);
  private eatService = inject(EatService);

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formBuld.group({
      name: [null, Validators.required],
      energia: [null, Validators.required],
      carboidrati: [null, Validators.required],
      grassi: [null, Validators.required],
      zuccheri: [null, Validators.required],
      proteine: [null, Validators.required],
      fibre: [null, Validators.required],
    });
  }

  onSubmit() {
    const alimento: Alimento = this.form.value;
    const { name, ...others } = this.form.value;

    this.eatService.eatName.next(name);
    this.eatService.createeat(alimento).subscribe(() => this.isCreate = false);
  }

}