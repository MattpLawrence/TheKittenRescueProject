import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { PetForm } from 'src/app/common/models/form.model';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-adopt-form-pet-info',
  templateUrl: './adopt-form-pet-info.component.html',
  styleUrls: ['./adopt-form-pet-info.component.scss']
})
export class AdoptFormPetInfoComponent extends BaseComponent implements OnInit {

  public form: FormGroup;
  hasSubmissionError: boolean = false;
  currentBreakPoint: BreakPointsEnum  = 0

  phoneValidation = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$";
  catExperienceList: string[] = ["First Time Cat Adopter", "Have Had A Few Cats", "	Knowledgeable and Experienced"]
  yesNo: string[] = ["Yes", "No"];
  adoptReasonList: string[] = ["Companionship", "Gift", "Company for another pet", "Mouser","Other"];


  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private commonService: CommonService
  ) {super()
    this.form = this.formBuilder.group({
      hasAdopted: new FormControl(null, [Validators.required]), //boolean
      //cat history section
      hasCats: new FormControl(null, [Validators.required]), //boolean
      numberOfCats: new FormControl(null),  //conditional validation in the html
      whereKept: new FormControl(null,), //conditional validation in the html
      stillHas: new FormControl(null,), //conditional validation in the html
      reason: new FormControl(null), //conditional validation in the html
      //all animals
      shownAggression: new FormControl(null, [Validators.required]), //boolean
      hasOtherPets: new FormControl(null, [Validators.required]),
      petDescription: new FormControl(null), //conditional validation in the html
      vetName: new FormControl(null, [Validators.required]),
      vetPhone: new FormControl(null, [Validators.pattern(this.phoneValidation)]),
      //this cat
      adoptReason: new FormControl(null, [Validators.required]), //select
      willDeclaw: new FormControl(null, [Validators.required]), //boolean
      locationDay: new FormControl(null, [Validators.required]),
      locationNight: new FormControl(null, [Validators.required]),
      locationSleep: new FormControl(null, [Validators.required]),
      movePlans: new FormControl(null, [Validators.required]),
      returnReason: new FormControl(null, [Validators.required]),
      hasViolence: new FormControl(null, [Validators.required]), //boolean
      catExperience: new FormControl(null, [Validators.required]), //select
      canCommit: new FormControl(null, [Validators.required]),  //boolean
      undesirableBehavior: new FormControl(null, [Validators.required]),
      desirableBehavior: new FormControl(null, [Validators.required]),
      referenceName: new FormControl(null, [Validators.required]),
      referencePhone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneValidation)]),   

    })
  }

  ngOnInit(): void {
    this.initScrollTop();
    this.initForm();
    this.initBreakpoint();
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

  initForm = () =>{
    this.commonService.getAdopterFormSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res != undefined){
        this.repopulateForm(res)
      }else{
        //look for session storage
        let storedObject = sessionStorage.getItem("petForm")

        if(storedObject != null && storedObject != null ){
          this.repopulateForm(JSON.parse(storedObject))
        }
      }
    })
  }

  initBreakpoint = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakPoint = res;
    })
  }


  repopulateForm = (object: any) => {
    //cycle through each form field and populate
    Object.keys(this.form.controls).forEach((key:string) => {
      //set payment subject result to a map
      let resultMap = new Map(Object.entries(object))
      //cycle through both maps and match keys
      this.form.get(key)?.setValue(resultMap.get(key));
    })
  }

  next = () => {
    
    if(this.form.valid){
      //create form object
      let formValue: PetForm = this.form.value;
      //set as observable
      this.commonService.setPetFormSubject(formValue);
      //convert to string then set storage object
      sessionStorage.setItem("petForm", JSON.stringify(formValue))
      //go to next page
      console.log(formValue);
    }
    else this.hasSubmissionError = true;
  }

  back = () => {
    this.router.navigate(['adopt-page/form-home-info']);
  }
}
