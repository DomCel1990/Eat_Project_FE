import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EatService } from '../../services/eat.service';
import { HttpEventType } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatFormFieldModule, MatProgressBarModule, MatInputModule, MatIconModule, MatButtonModule],
  providers: [EatService, {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FileUploadComponent}],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements ControlValueAccessor, OnChanges{
  @Input() requiredFileType:string;
  @Input({required: true}) eatName: string;
  fileUpladError = false;
  fileName = '';
  uploadProgress: number;

  onChange = (fileName: string) => {};
  onTouched = () => {};

  disable = false;

  private eatService = inject(EatService);
  private cdt = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['eatName']) {
      this.eatName = changes['eatName'].currentValue}
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched()
    fileUpload.click();
  }

  onFileSelected(event: Event) {
    const eventTarget = event.target as HTMLInputElement
    const file: File = eventTarget.files[0];

    file && (this.fileName = file.name);

    const formData = new FormData();
    formData.append('multipartFile', file);
    this.eatService.uploadImage(this.eatName, formData)
    .pipe(
      catchError(error => {
        this.fileUpladError = true;
        return of(error);
      }),
      // OPERATORE CHE CONSENTE DI ESEGUIRE UN OPERAZIONE QUANDO 
      // VIENE COMPLETATO L'OBSERVABLE O FALLISCE;
      finalize(() => {
        this.uploadProgress = null;
      }))
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((event.loaded / event.total!) * 100);
          this.cdt.detectChanges();
        } else if (event.type === HttpEventType.Response) {
          this.onChange(this.fileName);
        }
          
      });
  }

  writeValue(obj: any): void {
    this.fileName = obj;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }
}
