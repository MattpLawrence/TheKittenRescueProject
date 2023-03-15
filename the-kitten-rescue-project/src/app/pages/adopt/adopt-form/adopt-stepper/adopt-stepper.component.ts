import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AdoptStepperViewEnum } from 'src/app/common/models/common.enum';

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
  stepTwoClasses:string = 'inactive';
  stepThreeClasses:string = 'disabled';
  //set visited variable for stepper headers
  stepOneVisited: boolean = false;
  stepTwoVisited: boolean = false;
  stepThreeVisited: boolean = false;

  constructor() {super() }

  ngOnInit(): void {


  }


  changeStep = (step: number) => {
    console.log(step)
  }

  updateClasses = (step: AdoptStepperViewEnum) => {

    switch(step){
      case AdoptStepperViewEnum.userInfo:
        //change route and match query params
        this.stepOneVisited = true;
        this.stepName = "Adopter's Information";
        this.stepThreeVisited = false;
        this.stepThreeClasses = 'disabled'

        break;

      case AdoptStepperViewEnum.homeInfo:
        this.stepTwoVisited = true;
        this.stepTwoClasses = '';
        this.stepName = 'Household Information';
        this.stepThreeVisited = false;
        this.stepThreeClasses = 'disabled'
        break;

      case AdoptStepperViewEnum.petInfo:
        this.stepThreeVisited = true;
        this.stepThreeClasses = '';
        this.stepName = 'Pet Information';

        break;

    };
  };
}
