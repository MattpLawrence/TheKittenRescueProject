import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';
import { takeUntil} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTabGroup } from '@angular/material/tabs';
import { faPaypal} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-donate-tabs',
  templateUrl: './donate-tabs.component.html',
  styleUrls: ['./donate-tabs.component.scss']
})
export class DonateTabsComponent extends BaseComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup | undefined;

  currentBreakPoint: BreakPointsEnum = 0;
  donateString: string = 'Ways To Donate';
  matchingString: string = 'Employer Matching';


  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
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



  navigate = (isBack: boolean) => {
    //verify that the tabgroup is set
    if(this.tabGroup?.selectedIndex != undefined){
      //navigate
      isBack? this.tabGroup.selectedIndex! += 1: this.tabGroup.selectedIndex! -= 1;
    }
  }
}