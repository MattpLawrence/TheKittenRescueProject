import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-home-info',
  templateUrl: './adopt-form-home-info.component.html',
  styleUrls: ['./adopt-form-home-info.component.scss']
})
export class AdoptFormHomeInfoComponent extends BaseComponent implements OnInit {

  public form: FormGroup;
  hasSubmissionError: boolean = false;
  homeTypeList: string[] = ["House","Apartment","Condo","Town Home","Other"];
  estTimeList: string[] = ["0-2 Hours", "3-6 Hours", "7-10 Hours", "10+ Hours"];
  yesNo: string[] = ["Yes", "No"];
  

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
  ) {super()
    this.form = this.formBuilder.group({
      homeType: new FormControl('', [Validators.required]), //select
      timeOfOccupancy: new FormControl('', [Validators.required]),
      numberOfOccupants: new FormControl( null, [Validators.required]),
      numberOfChildren: new FormControl(null, [Validators.required]),
      homeEnvironment: new FormControl(null, [Validators.required]), //select?
      hasSmokers: new FormControl(null, [Validators.required]), //boolean
      hasAllergies: new FormControl(null, [Validators.required]), //boolean
      primaryOccupant: new FormControl(null, [Validators.required]),
      primaryFinancier: new FormControl(null, [Validators.required]),
      primaryOccupantJob: new FormControl(null, [Validators.required]),
      worksFromHome: new FormControl(null, [Validators.required]), //boolean
      hasOccupantHome: new FormControl(null, [Validators.required]), //boolean
      estTimeAlone: new FormControl(null, [Validators.required]), //select
      emergencyContact: new FormControl(null, [Validators.required]),
      emergencyContactRelationship: new FormControl(null, [Validators.required]),

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
