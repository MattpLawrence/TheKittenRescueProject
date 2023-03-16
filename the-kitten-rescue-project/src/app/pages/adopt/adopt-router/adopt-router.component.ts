import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AdoptStepperViewEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-adopt-router',
  templateUrl: './adopt-router.component.html',
  styleUrls: ['./adopt-router.component.scss']
})
export class AdoptRouterComponent extends BaseComponent implements OnInit {

  currentStep: AdoptStepperViewEnum = AdoptStepperViewEnum.home;


  constructor(
    private commonService: CommonService,
    private router:Router
  ) {super() }

  ngOnInit(): void {
    this.initStep();
  }

  initStep = () => {
    this.commonService.getAdoptStepSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentStep = res
    })
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
