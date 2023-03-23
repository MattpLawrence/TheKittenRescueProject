import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';
import { takeUntil} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-donate-tabs',
  templateUrl: './donate-tabs.component.html',
  styleUrls: ['./donate-tabs.component.scss']
})
export class DonateTabsComponent extends BaseComponent implements OnInit {

  currentBreakPoint: BreakPointsEnum = 0;
  donateString: string = 'Ways To Donate';
  matchingString: string = 'Employer Matching';
  paypalContent:any =`<div id="donate-button-container">
  <div id="donate-button"></div>
  <script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" charset="UTF-8"></script>
  <script>
  PayPal.Donation.Button({
  env:'production',
  hosted_button_id:'D4KU8TM7F6APW',
  image: {
  src:'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
  alt:'Donate with PayPal button',
  title:'PayPal - The safer, easier way to pay online!',
  }
  }).render('#donate-button');
  </script>
  </div>
  `

  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { super() }

  ngOnInit(): void {
    this.initBreakpoint();
    this.initPaypal()
  }

  initBreakpoint = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakPoint = res;

      //shorten strings
      if(res > 1){
        this.donateString = 'Donate';
        this.matchingString = 'Matching';
      }else{
        this.donateString = 'Ways To Donate';
        this.matchingString = 'Employer Matching';
      }
    })
  }

  initPaypal = () => {
    this.paypalContent = this.sanitizer.bypassSecurityTrustHtml(this.paypalContent);
  }

}