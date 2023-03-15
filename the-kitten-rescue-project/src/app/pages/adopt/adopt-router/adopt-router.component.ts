import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdoptStepperViewEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-adopt-router',
  templateUrl: './adopt-router.component.html',
  styleUrls: ['./adopt-router.component.scss']
})
export class AdoptRouterComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.initStep();
  }

  initStep = () => {
    let currentStep: AdoptStepperViewEnum = AdoptStepperViewEnum.home;

    switch(true){
      case this.getParamValueString("home"):
        break;
      case this.getParamValueString("form-user-info"):
        currentStep = AdoptStepperViewEnum.userInfo
        break;
      case this.getParamValueString("form-home-info"):
        currentStep = AdoptStepperViewEnum.homeInfo
        break;
      case this.getParamValueString("form-pet-info"):
        currentStep = AdoptStepperViewEnum.petInfo
        break;
      default :
        currentStep = AdoptStepperViewEnum.home;
        break
    }

    this.commonService.setAdoptStepSubject(currentStep);
    console.log(currentStep)
  }

  //manual query because angular native solution is too slow to catch the params first time.
  getParamValueString( paramName: string ) {
    console.log(paramName)
    const url = window.location.href;
    let contains: boolean = false;
    if(url.includes(paramName)) contains = true

    return contains;
  }

}
