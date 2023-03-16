import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AdoptStepperViewEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-adopt-stepper',
  templateUrl: './adopt-stepper.component.html',
  styleUrls: ['./adopt-stepper.component.scss']
})
export class AdoptStepperComponent extends BaseComponent implements OnInit {

  stepName:string = "Adopter's Information"

  //set enum for use in HTML
  AdoptStepperViewEnum = AdoptStepperViewEnum;
  //set class strings for stepper header
  stepOneClasses:string = '';
  stepTwoClasses:string = 'disabled';
  stepThreeClasses:string = 'disabled';
  //set visited variable for stepper headers
  stepOneVisited: boolean = false;
  stepTwoVisited: boolean = false;
  stepThreeVisited: boolean = false;

  currentStep: AdoptStepperViewEnum = AdoptStepperViewEnum.userInfo

  constructor(
    private commonService: CommonService
  ) {super() }

  ngOnInit(): void {
    this.initStep();
  }

  initStep = () => {
    this.commonService.getAdoptStepSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log(res)
      this.currentStep = res;
      if(res != 0)this.updateClasses(res)
    })
  }

  changeStep = (step: number) => {
    this.updateClasses(step)
  }

  updateClasses = (step: AdoptStepperViewEnum) => {
    console.log(step)

    switch(step){
      case AdoptStepperViewEnum.userInfo:
        //change route and match query params
        this.stepOneVisited = true;
        this.stepName = "Adopter's Information";

        break;

      case AdoptStepperViewEnum.homeInfo:
        this.stepTwoVisited = true;
        this.stepTwoClasses = '';
        this.stepName = 'Household Information';
        break;

      case AdoptStepperViewEnum.petInfo:
        this.stepThreeVisited = true;
        this.stepThreeClasses = '';
        this.stepName = 'Pet Information';
        break;

    };
  };
}
