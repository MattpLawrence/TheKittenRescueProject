import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AdopterForm } from 'src/app/common/models/form.model';
import { CommonService } from 'src/app/common/services/common.service';

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

  hasSubmissionError: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private commonService: CommonService
  ) {
    super()
    this.form = this.formBuilder.group({
      adopterFirstName: new FormControl('', [Validators.required]),
      adopterLastName: new FormControl('', [Validators.required]),
      adopterDOB: new FormControl('', [Validators.required]),
      primaryOccupantJob: new FormControl(null, [Validators.required]),
      adopterPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.phoneValidation)]),
      adopterEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailValidation)]),
      adopterEmailConfirm: new FormControl('', [Validators.required, Validators.pattern(this.emailValidation)]),
      driversState: new FormControl(null, [Validators.required]),
      adopterAddressLine1: new FormControl('', [Validators.required]),
      adopterAddressLine2: new FormControl(''),
      adopterCity: new FormControl('', [Validators.required]),
      adopterState: new FormControl('', [Validators.required]),
      adopterZip: new FormControl('', [Validators.required]),

    }, { validator: this.checkEmailMatch });
  }

  ngOnInit(): void {
    this.initScrollTop()
    this.initForm();
  }

  public error = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
  
  initScrollTop =() => {

    //scroll to top of page
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    },150)
  }

  initForm = () =>{
    this.commonService.getAdopterFormSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res != undefined){
        this.repopulateForm(res)
      }else{
        //look for session storage
        let storedObject = sessionStorage.getItem("adopterForm")

        if(storedObject != null && storedObject != null ){
          this.repopulateForm(JSON.parse(storedObject))
        }
      }
    })
  }

  checkEmailMatch(group: FormGroup) {
    let email = group.controls.adopterEmail.value;
    let confirmEmail = group.controls.adopterEmailConfirm.value;

    if(email != undefined && confirmEmail != undefined){
    return email!.toLowerCase() == confirmEmail!.toLowerCase() ? null : { adopterEmailConfirm: true }
    } else{ return null}
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
      let formValue: AdopterForm = this.form.value;
      //set as observable
      this.commonService.setAdopterFormSubject(formValue);
      //convert to string then set storage object
      sessionStorage.setItem("adopterForm", JSON.stringify(formValue))
      //go to next page
      this.router.navigate(['adopt-page/form-home-info']);
      this.hasSubmissionError = false;
      console.log(formValue);
    }
    else this.hasSubmissionError = true;
  }

  back = () => {
    this.router.navigate(['adopt-page/home']);
  }
}
