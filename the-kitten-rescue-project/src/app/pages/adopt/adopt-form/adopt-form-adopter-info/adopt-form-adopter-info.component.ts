import { ViewportScroller } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { CatLoaderComponent } from 'src/app/common/components/cat-loader/cat-loader.component';

import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { AdopterForm } from 'src/app/common/models/form.model';
import { APIService } from 'src/app/common/services/api.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-adopt-form-adopter-info',
  templateUrl: './adopt-form-adopter-info.component.html',
  styleUrls: ['./adopt-form-adopter-info.component.scss']
})
export class AdoptFormAdopterInfoComponent extends BaseComponent implements OnInit, AfterViewInit{

  public form: FormGroup;
  //regex validation
  emailValidation = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  phoneValidation = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$";
  hasSubmissionError: boolean = false;
  petNameList: string[] = [];
  selectedNameType = '1';
  isExpanded: boolean = false;
  yesNo: string[] = ["Yes", "No"];
  paramName: string | undefined = undefined;
  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private commonService: CommonService,
    private apiService: APIService,
    public dialog: MatDialog
  ) {
    super()
    this.form = this.formBuilder.group({
      petName: new FormControl('',), // required conditionally set in html
      hasOtherRequest: new FormControl(null, [Validators.required]),
      otherNameRequest: new FormControl(null),
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
    this.initParams();
    this.initPetList();
    this.initBreakpoints();
  }
  ngAfterViewInit(){
    this.initScrollTop()
  }

  public error = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  initScrollTop =() => {
    //scroll to top of page
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    },200)
  }

  initParams = () => {
    this.paramName = this.getParamValueString("petName") !== null ? this.getParamValueString("petName")! : undefined;
  }

  //manual query because angular native solution is too slow to catch the params first time.
  getParamValueString( paramName: string ) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res
    })
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
    if(this.paramName != undefined){
        if(this.petNameList !== undefined){
            let foundName = this.petNameList.find((name: string) => { return name.toLowerCase().includes(this.paramName!.toLowerCase())})
            if(foundName != undefined){
              this.form.get("petName")?.setValue(foundName);
          }
        }
      }
  }

  initCurrentPet = () => {
    //get current animal if any
    this.apiService.getCurrentAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res != undefined){
        if(res.name != undefined){
          this.form.controls.petName.setValue(res.name)
        }
      }
    })
  }

  initPetList = () => {
    // get list of animals

    let modalWidth: string = "50vw";

    switch(this.currentBreakpoint){
      case BreakPointsEnum.isDesktop:
        modalWidth = "50vw";
        break;

      case BreakPointsEnum.isTablet:
        modalWidth = "80vw";
        break;

      case BreakPointsEnum.isMobile:
        modalWidth = "100vw";
        break;
    }


    this.apiService.getAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res !== undefined){
        //create an array of names ans sort alphabetically
        this.petNameList = [...res.animals.map((obj:any) => obj.name)].sort((a, b) => a.localeCompare(b));
        this.initForm();
        this.initCurrentPet();
      }else{
         //init loader
        const dialogRef = this.dialog.open(CatLoaderComponent, {
          disableClose: true,
          panelClass: "noPadding",
          width: modalWidth
        })
        setTimeout(() => {
          if(!this.isLoading)dialogRef.close();
          else this.isLoading = false;
        },1800)
        //if no subject then do the query
        this.apiService.searchAnimals().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          //create an array of names ans sort alphabetically
          this.petNameList = [...res.animals.map((obj:any) => obj.name)].sort((a, b) => a.localeCompare(b));
          this.initForm();
          this.initCurrentPet();
          this.isLoading = false
        })
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
      if(key !== "petName"){
        this.form.get(key)?.setValue(resultMap.get(key));
      }else if(key === "petName" && this.paramName != undefined){
        if(this.petNameList !== undefined){
            let foundName = this.petNameList.find((name: string) => { return name.toLowerCase().includes(this.paramName!.toLowerCase())})
            if(foundName != undefined){
              this.form.get(key)?.setValue(foundName);
          }
        }
      }else{
        this.form.get(key)?.setValue(resultMap.get(key));
      }
    })

    this.initCurrentPet()
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
    }
    else this.hasSubmissionError = true;
  }

  back = () => {
    this.router.navigate(['adopt-page/home']);
  }
}
