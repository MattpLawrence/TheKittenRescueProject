import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-pet-info',
  templateUrl: './adopt-form-pet-info.component.html',
  styleUrls: ['./adopt-form-pet-info.component.scss']
})
export class AdoptFormPetInfoComponent extends BaseComponent implements OnInit {

  public form: FormGroup;

  hasSubmissionError: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
  ) {super()
    this.form = this.formBuilder.group({
      adopterFirstName: new FormControl('', [Validators.required]),
      adopterLastName: new FormControl('', [Validators.required]),
      adopterDOB: new FormControl('', [Validators.required]),
      adopterAddressLine1: new FormControl('', [Validators.required]),
      adopterAddressLine2: new FormControl(''),
      adopterCity: new FormControl('', [Validators.required]),
      adopterState: new FormControl('', [Validators.required]),
      adopterZip: new FormControl('', [Validators.required]),

    })
  }

  ngOnInit(): void {

  }

  public error = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  next = () => {
    if(this.form.valid)this.router.navigate(['adopt-page/form-pet-info']);
    else this.hasSubmissionError = true;
  }

  back = () => {
    this.router.navigate(['adopt-page/form-adopter-info']);
  }
}
