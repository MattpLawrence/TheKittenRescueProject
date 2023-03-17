import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { CommonService } from 'src/app/common/services/common.service';

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
    private viewportScroller: ViewportScroller
  ) {super()
    this.form = this.formBuilder.group({
      hasAdopted: new FormControl(null, [Validators.required]),
      //cat history section
      hasCats: new FormControl(null, [Validators.required]),
      numberOfCats: new FormControl(null, [Validators.required]),
      whereKept: new FormControl(null, [Validators.required]),
      stillHas: new FormControl(null, [Validators.required]),
      reason: new FormControl(null),
      //all animals
      shownAggression: new FormControl(null, [Validators.required]),
      hasOtherPets: new FormControl(null, [Validators.required]),
      petDescription: new FormControl(null, [Validators.required]),
      vetName: new FormControl(null, [Validators.required]),
      vetPhone: new FormControl(null, [Validators.required]),
      //this cat
      adoptReason: new FormControl(null),
      willDeclaw: new FormControl(null, [Validators.required]),
      locationDay: new FormControl(null, [Validators.required]),
      locationNight: new FormControl(null, [Validators.required]),
      locationSleep: new FormControl(null, [Validators.required]),
      hadDoggyDoor: new FormControl(null, [Validators.required]),

    })
  }

  ngOnInit(): void {
    this.initScrollTop()
  }

  public error = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  
  initScrollTop =() => {
    //scroll to top of page
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    },1)
  }

  get petHistory(){
    return this.form.controls.petHistory as FormArray;
  }



  next = () => {
    
    // if(this.form.valid)this.router.navigate(['adopt-page/form-pet-info']);
    // if(this.form.valid)console.log('what next?');
    // else this.hasSubmissionError = true;
  }

  back = () => {
    this.router.navigate(['adopt-page/form-home-info']);
  }
}
