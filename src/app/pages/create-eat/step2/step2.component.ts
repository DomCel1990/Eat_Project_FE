import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EatService } from '../../../services/eat.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    MatButtonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    FileUploadComponent],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {
  form: FormGroup;
  eatName: string;

  private formBuld = inject(FormBuilder);
  private eatService = inject(EatService);


  ngOnInit(): void {

    this.eatService.eatName.subscribe(name => this.eatName = name);

    this.setForm();
  }

  setForm() {
    this.form = this.formBuld.group({
      fileUpload: [null, Validators.required],
    });
  }
}
