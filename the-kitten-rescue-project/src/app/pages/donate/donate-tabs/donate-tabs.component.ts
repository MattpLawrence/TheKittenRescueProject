import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';
import { takeUntil} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PaypalModalComponent } from 'src/app/common/components/paypal-modal/paypal-modal.component';

@Component({
  selector: 'app-donate-tabs',
  templateUrl: './donate-tabs.component.html',
  styleUrls: ['./donate-tabs.component.scss']
})
export class DonateTabsComponent extends BaseComponent implements OnInit {

  currentBreakPoint: BreakPointsEnum = 0;
  donateString: string = 'Ways To Donate';
  matchingString: string = 'Employer Matching';

  constructor(
    private commonService: CommonService,
    private dialog: MatDialog
  ) { super() }

  ngOnInit(): void {
    this.initBreakpoint();
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

  openPaypal = () => {
    let modalWidth: string = '';

    switch(this.currentBreakPoint){
      case BreakPointsEnum.isDesktop:
        modalWidth = "70vw";
        break;

      case BreakPointsEnum.isTablet:
        modalWidth = "90vw";
        break;

      case BreakPointsEnum.isMobile:
        modalWidth = "100vw";
        break;
    }

    let dialogRef = this.dialog.open(PaypalModalComponent, {
      disableClose: false,
      panelClass: "overflowAuto",
      width: modalWidth,
      maxWidth: '100vw',
    })

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {

    })
  }

}