import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { HomeForm } from 'src/app/common/models/form.model';
import { CommonService } from 'src/app/common/services/common.service';

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
    private viewportScroller: ViewportScroller,
    private commonService: CommonService
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
      hasDoggyDoor: new FormControl(null, [Validators.required]), //boolean
      hasOutdoorAccess: new FormControl(null, [Validators.required]), //boolean
      estTimeAlone: new FormControl(null, [Validators.required]), //select
      emergencyCareTaker: new FormControl(null, [Validators.required])

    })
  }

  ngOnInit(): void {
    this.initScrollTop()
    this.initForm()
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
    this.commonService.getHomeFormSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res != undefined){
        this.repopulateForm(res)
      }else{
        //look for session storage
        let storedObject = sessionStorage.getItem("homeForm")
        console.log(storedObject)
        if(storedObject != null && storedObject != null ){
          this.repopulateForm(JSON.parse(storedObject))
        }
      }
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
      let formValue: HomeForm = this.form.value;
      //set as observable
      this.commonService.setHomeFormSubject(formValue);
      //convert to string then set storage object
      sessionStorage.setItem("homeForm", JSON.stringify(formValue))
      //go to next page
      this.router.navigate(['adopt-page/form-pet-info']);
      console.log(formValue);
    }
    else this.hasSubmissionError = true;
  }

  back = () => {
    this.router.navigate(['adopt-page/form-adopter-info']);
  }
}
