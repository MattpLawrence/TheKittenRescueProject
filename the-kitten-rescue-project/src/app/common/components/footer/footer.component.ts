import { Component, OnInit } from '@angular/core';
import { faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { faYoutube, faTiktok, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { BaseComponent } from '../base/base.component';
import { CommonService } from '../../services/common.service';
import { takeUntil } from 'rxjs';
import { BreakPointsEnum } from '../../models/common.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

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
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    public clipboard: Clipboard
  ) {super() }

  ngOnInit(): void {

    this.initBreakpoint();
  }

  initBreakpoint = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
    })
  }

  copyEmail = () => {
    const pending = this.clipboard.beginCopy('Info@thekittenproject.org');
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };
    attempt();
    this.snackBar.open('Email Address Copied To Clipboard', 'close', { duration: 1500, panelClass: 'simpleSnack' });
  }

}
