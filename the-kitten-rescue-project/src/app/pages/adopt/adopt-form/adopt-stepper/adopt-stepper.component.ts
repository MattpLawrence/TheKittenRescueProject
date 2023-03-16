import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private commonService: CommonService,
    private router: Router
  ) {super() }

  ngOnInit(): void {
    this.initStep();
  }

  initStep = () => {
    this.commonService.getAdoptStepSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentStep = res;
      if(res != 0)this.updateClassesRoutes(res)
    })
  }

  changeStep = (step: number) => {
    this.updateClassesRoutes(step)
    this.commonService.setAdoptStepSubject(step);
  }

  updateClassesRoutes = (step: AdoptStepperViewEnum) => {

    switch(step){
      case AdoptStepperViewEnum.userInfo:
        //change route and match query params
        this.stepOneVisited = true;
        this.stepName = "Adopter's Information";
        this.stepOneClasses = '';
        if(this.stepTwoVisited) this.stepTwoClasses = 'inactive';
        if(this.stepThreeVisited) this.stepThreeClasses = 'inactive';
        //change routes
        this.router.navigate(['adopt-page/form-adopter-info']);
        break;

      case AdoptStepperViewEnum.homeInfo:
        this.stepTwoVisited = true;
        this.stepTwoClasses = '';
        this.stepName = 'Household Information';
        this.stepOneClasses = 'inactive';
        if(this.stepThreeVisited) this.stepThreeClasses = 'inactive';
        //change routes
        this.router.navigate(['adopt-page/form-home-info']);
        break;

      case AdoptStepperViewEnum.petInfo:
        this.stepThreeVisited = true;
        this.stepThreeClasses = '';
        this.stepName = 'Pet Information';
        this.stepOneClasses = 'inactive';
        this.stepTwoClasses = 'inactive';
        //change routes
        this.router.navigate(['adopt-page/form-pet-info']);
        break;

    };
  };
}
