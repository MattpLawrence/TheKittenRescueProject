import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-adopter-info',
  templateUrl: './adopt-form-adopter-info.component.html',
  styleUrls: ['./adopt-form-adopter-info.component.scss']
})
export class AdoptFormAdopterInfoComponent extends BaseComponent implements OnInit {

  public form: FormGroup;
  //regex validation
  emailValidation = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  phoneValidation = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    super()
    this.form = new FormGroup({
      adopterFirstName: new FormControl('', [Validators.required]),
      adopterLastName: new FormControl('', [Validators.required]),
      adopterOccupation: new FormControl('', [Validators.required]),
      adopterPhoneNumber: new FormControl('', [Validators.required]),
      adopterEmail: new FormControl('', [Validators.required]),
      adopterEmailConfirm: new FormControl('', [Validators.required]),
      adopterAddressLine1: new FormControl('', [Validators.required]),
      adopterAddressLine2: new FormControl(''),
      adopterCity: new FormControl('', [Validators.required]),
      adopterState: new FormControl('', [Validators.required]),
      adopterZip: new FormControl('', [Validators.required]),
      adopterDOB: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  public error = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  next = () => {
    this.router.navigate(['adopt-page/form-home-info']);
  }

  back = () => {
    this.router.navigate(['adopt-page/home']);
  }
}
