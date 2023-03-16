import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from './common/components/base/base.component';
import { AdoptStepperViewEnum } from './common/models/common.enum';
import { AuthService } from './common/services/auth.service';
import { CommonService } from './common/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'the-kitten-rescue-project';

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
    ) { super() };

  ngOnInit(): void {
    this.initAuthTokenTimer();
    this.initStep();
  }

  initAuthTokenTimer(){
    //kick off timer to refresh oAuth token
    this.authService.startTokenTimer();
    //get initial oAuth token
    this.authService.getToken();
  }

  initStep = () => {
    let step: AdoptStepperViewEnum = AdoptStepperViewEnum.home;
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          switch(true){
            case this.getParamValueString("form-adopter-info"):
              step = AdoptStepperViewEnum.userInfo
              break;
            case this.getParamValueString("form-home-info"):
              step = AdoptStepperViewEnum.homeInfo
              break;
            case this.getParamValueString("form-pet-info"):
              step = AdoptStepperViewEnum.petInfo
              break;
            default :
              step = AdoptStepperViewEnum.home;
              break
          }
      
          this.commonService.setAdoptStepSubject(step);
      }})
  }

  //manual query because angular native solution is too slow to catch the params first time.
  getParamValueString( paramName: string ) {
    const url = window.location.href;
    let contains: boolean = false;
    if(url.includes(paramName)) contains = true

    return contains;
  }
}
