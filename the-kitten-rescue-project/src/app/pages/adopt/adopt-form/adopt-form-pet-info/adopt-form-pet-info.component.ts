import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { TeaLoaderComponent } from 'src/app/common/components/tea-loader/tea-loader.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { AdopterForm, AdoptionForm, EmailBody, HomeForm, PetForm } from 'src/app/common/models/form.model';
import { APIService } from 'src/app/common/services/api.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-adopt-form-pet-info',
  templateUrl: './adopt-form-pet-info.component.html',
  styleUrls: ['./adopt-form-pet-info.component.scss']
})
export class AdoptFormPetInfoComponent extends BaseComponent implements OnInit {

  public form: FormGroup;
  hasSubmissionError: boolean = false;
  currentBreakPoint: BreakPointsEnum = 0
  isLoading: boolean = false;

  phoneValidation = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$";
  catExperienceList: string[] = ["First Time Cat Adopter", "Have Had A Few Cats", "	Knowledgeable and Experienced"]
  yesNo: string[] = ["Yes", "No"];
  adoptReasonList: string[] = ["Companionship", "Gift", "Company for another pet", "Mouser", "Other"];


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
      vetPhone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneValidation)]),
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


  initScrollTop = () => {
    //scroll to top of page
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    }, 1)
  }

  initForm = () => {
    this.commonService.getPetFormSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res != undefined) {
        this.repopulateForm(res)
      } else {
        //look for session storage
        let storedObject = localStorage.getItem("petForm")

        if (storedObject != null && storedObject != undefined) {
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
    Object.keys(this.form.controls).forEach((key: string) => {
      //set payment subject result to a map
      let resultMap = new Map(Object.entries(object))
      //cycle through both maps and match keys
      this.form.get(key)?.setValue(resultMap.get(key));
    })
  }

  next = () => {

    if (this.form.valid) {

      let modalWidth: string = "50vw";

      switch (this.currentBreakPoint) {
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
      //init loader
      const dialogRef = this.dialog.open(TeaLoaderComponent, {
        disableClose: false,
        // disableClose: true,
        panelClass: "noPadding",
        width: modalWidth,
      })


      //create form object
      let formValue: PetForm = this.form.value;
      //set as observable
      this.commonService.setPetFormSubject(formValue);
      //convert to string then set storage object
      localStorage.setItem("petForm", JSON.stringify(formValue))
      //make post call
      this.apiService.postApplication(this.buildBody(formValue)).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
        console.log(res)
        if (res.status == 200 || res.status == 201) {
          dialogRef.close()
          this.router.navigate(['adopt-page/application-confirmation']);
        }
        else {
          dialogRef.close()
          this.router.navigate(['adopt-page/application-error']);
        }
      })
      //go to next page
    }
    else this.hasSubmissionError = true;
  }

  buildBody = (formValue: PetForm): any => {
    console.log('hit')
    let adopterForm: AdopterForm | undefined;
    let homeForm: HomeForm | undefined;
    this.commonService.getAdopterFormSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res != undefined) adopterForm = res;
      else {
        let storedObject = localStorage.getItem("adopterForm")
        if (storedObject != null && storedObject != undefined) {
          adopterForm = JSON.parse(storedObject)
        }
      };
    });
    this.commonService.getHomeFormSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res != undefined) homeForm = res;
      else {
        let storedObject = localStorage.getItem("homeForm")
        if (storedObject != null && storedObject != undefined) {
          homeForm = JSON.parse(storedObject)
        }
      };
    })
    //build final adoptionForm
    let adoptionForm: AdoptionForm = {
      //set final email destination
      recipientAddress: 'info@thekittenproject.org',
      adopterForm: adopterForm!,
      homeForm: homeForm!,
      petForm: formValue
    }

    return this.buildEmailBody(adoptionForm);
  }


  buildEmailBody = (adoptionForm: AdoptionForm): EmailBody => {
    const adopterForm = adoptionForm.adopterForm;
    const homeForm = adoptionForm.homeForm;
    const petForm = adoptionForm.petForm;

    //set warning text
    let willDeclaw = petForm.willDeclaw == 'Yes' ? '<h3 style="color: rgb(184, 40, 40);"> Answered "Yes" to Declaw</h3>' : '';
    let allowOutside = homeForm.hasOutdoorAccess == 'Yes' ? '<h3 style="color: rgb(184, 40, 40)"> Answered "Yes" To Allow Access To Outside</h3>' : '';
    let hasViolence = petForm.hasViolence == 'Yes' ? '<h3 style="color: rgb(184, 40, 40)"> Answered "Yes" To Has History Of Violence</h3>' : '';
    let wontCommit = petForm.canCommit == 'No' ? '<h3 style="color: rgb(184, 40, 40)"> Answered "No" To Committing For 13-17 Years</h3>' : '';
    let isAggressive = petForm.shownAggression == 'Yes' ? '<h3 style="color: orange;"> Answered "Yes" To Having Aggressive Pets</h3>' : '';
    let hasSmokers = homeForm.hasSmokers == 'Yes' ? '<h3 style="color: orange;"> Answered "Yes" To Having Smokers In The House</h3>' : '';
    let isPresent = '';
    let otherRequest = adopterForm.hasOtherRequest == true ? `<h3> Additional Request</h3>${adopterForm.otherNameRequest}` : '';

    if (petForm.adoptReason == 'Gift') isPresent = '<h3 style="color: orange;"> Answered "Yes" To Being A Present</h3>'
    else if (petForm.adoptReason == 'Mouser') {
      isPresent = '<h3 style="color: orange;"> Answered "Yes" To Being A Mouser</h3>'
    }

    const output = `
    <h2> You Have a new Adoption Request For:</h2>
    <div style="color: #7b6fd3; font-size: 2.5rem; margin-bottom: 2rem;">${adopterForm.petName}</div>
    ${willDeclaw}
    ${allowOutside}
    ${hasViolence}
    ${wontCommit}
    ${isAggressive}
    ${hasSmokers}
    ${isPresent}
    <h2 style="margin-top: 4rem;">Pet Request For:</h2>
    <div>
    ${adopterForm.petName}
    ${otherRequest}
    </div>
  
    <h3>Adopter Details</h3>
    <ul>
      ${this.generateListItem('First Name', adopterForm.adopterFirstName)}
      ${this.generateListItem('Last Name', adopterForm.adopterLastName)}
      ${this.generateListItem('Date Of Birth', adopterForm.adopterDOB)}
      ${this.generateListItem('Primary Phone Number', adopterForm.adopterPhoneNumber)}
      ${this.generateListItem('Email Address', adopterForm.adopterEmail)}
      ${this.generateListItem('Occupation', adopterForm.primaryOccupantJob)}
      ${this.generateListItem('Drivers License State', adopterForm.driversState)}
      ${this.generateListItem('Address Line 1', adopterForm.adopterAddressLine1)}
      ${this.generateListItem('Address Line 2', adopterForm.adopterAddressLine2 ?? '')}
      ${this.generateListItem('City', adopterForm.adopterCity)}
      ${this.generateListItem('State', adopterForm.adopterState)}
      ${this.generateListItem('Zip Code', adopterForm.adopterZip)}
    </ul>
    <br>
    <h3>Home Details</h3>
    <ul>
      ${this.generateListItem('Type of Residence', homeForm.homeType)}
      ${this.generateListItem('Time At Your Current Residence', homeForm.timeOfOccupancy)}
      ${this.generateListItem('Number Of Residents In Your Home', homeForm.numberOfOccupants)}
      ${this.generateListItem('Number Of Children In Your Home', homeForm.numberOfChildren)}
      ${this.generateListItem('Please Describe Your Home Environment', homeForm.homeEnvironment)}
      ${this.generateListItem('Does Anyone In Your Home Smoke', homeForm.hasSmokers)}
      ${this.generateListItem('Is Anyone Allergic To Cats', homeForm.hasAllergies)}
      ${this.generateListItem('Who Will Be Primarily Responsible For This Animal', homeForm.primaryOccupant)}
      ${this.generateListItem('Does Your Home Have A Doggy Door', homeForm.hasDoggyDoor)}
      ${this.generateListItem('Will This Cat Have Outdoor Access', homeForm.hasOutdoorAccess)}
      ${this.generateListItem('Time This Animal Will Spend Alone On An Average Day', homeForm.estTimeAlone)}
      ${this.generateListItem('If something were to happen to you, who would take responsibility of your pet(s)?', homeForm.emergencyCareTaker)}
    </ul>
    <h3>Pet Details</h3>
    <ul>
      ${this.generateListItem('Have You Adopted From A Rescue Before', petForm.hasAdopted)}
      ${this.generateListItem('In The Last Five Years Have You Owned Any Cats', petForm.hasCats)}
      ${this.generateListItem('How Many Cats', petForm.numberOfCats?.toString() ?? '')}
      ${this.generateListItem('Where Do You Keep These Cats', petForm.whereKept?.toString() ?? '')}
      ${this.generateListItem('Do You Still Have This Cat', petForm.stillHas?.toString() ?? '')}
      ${this.generateListItem('Reason You No Longer Have This Cat', petForm.reason?.toString() ?? '')}
      ${this.generateListItem('Do Any Animals In Your Home Currently Show Aggression', petForm.shownAggression)}
      ${this.generateListItem('Do You Currently Have Any Other Animals In Your Home', petForm.hasOtherPets)}
      ${this.generateListItem('Describe Your Other Pets', petForm.petDescription?.toString() ?? '')}
      ${this.generateListItem('Name Of Your Veterinarian', petForm.vetName?.toString() ?? '')}
      ${this.generateListItem('Veterinarian\'s Phone Number', petForm.vetPhone?.toString() ?? '')}
      ${this.generateListItem('Why Do You Want To Adopt This Cat', petForm.adoptReason)}
      ${this.generateListItem('Will You Declaw This Cat', petForm.willDeclaw)}
      ${this.generateListItem('Where Will You Keep This Cat During The Day', petForm.locationDay)}
      ${this.generateListItem('Where Will You Keep This Cat At Night', petForm.locationNight)}
      ${this.generateListItem('Where Will This Cat Sleep', petForm.locationSleep)}
      ${this.generateListItem('If You Needed To Move What Would You Do With This Cat', petForm.movePlans)}
      ${this.generateListItem('Under What Conditions Would You Return This Cat', petForm.returnReason)}
      ${this.generateListItem('Does Anyone In Your Home Have A History Of Violence Or Animal Abuse', petForm.hasViolence)}
      ${this.generateListItem('What Level Of Cat Experience Do You Have', petForm.catExperience)}
      ${this.generateListItem('A Cat Can Live An Average Of 13-17 Years, Can You Commit To Caring For This Cat For That Amount Of Time', petForm.canCommit)}
      ${this.generateListItem('What Behaviors Do You Find Undesirable', petForm.undesirableBehavior)}
      ${this.generateListItem('What Behaviors Do You Find Desirable', petForm.desirableBehavior)}
      ${this.generateListItem('Name of Personal Reference', petForm.referenceName)}
      ${this.generateListItem('Phone Number of Personal Reference', petForm.referencePhone)}
    </ul>
    `;
    return {
      petName: adopterForm.petName,
      applicantName: adopterForm.adopterFirstName + ' ' + adopterForm.adopterLastName,
      emailBody: output
    }
  }

  private generateListItem(label: string, value: string): string {
    return `<li style="line-height: 1.5rem; font-weight: 500;">${label}: <span style="margin-left: 0.5rem; font-weight: 400;"> ${value} </span></li>`;
  }

  back = () => {
    this.router.navigate(['adopt-page/form-home-info']);
  }
}
