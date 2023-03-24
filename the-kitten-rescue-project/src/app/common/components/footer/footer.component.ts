import { Component, OnInit } from '@angular/core';
import { faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { faYoutube, faTiktok, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { BaseComponent } from '../base/base.component';
import { CommonService } from '../../services/common.service';
import { takeUntil } from 'rxjs';
import { BreakPointsEnum } from '../../models/common.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent implements OnInit {

  icons = {
    youtube: faYoutube,
    tiktok: faTiktok,
    facebook: faFacebook,
    instagram: faInstagram,
    email: faEnvelope
  }

  currentBreakpoint: BreakPointsEnum = 0;

  constructor(
    private commonService: CommonService
  ) {super() }

  ngOnInit(): void {

    this.initBreakpoint();
  }

  initBreakpoint = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
      console.log(res)
    })
  }

}
