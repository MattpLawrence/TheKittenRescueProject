import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-about-tabs',
  templateUrl: './about-tabs.component.html',
  styleUrls: ['./about-tabs.component.scss']
})
export class AboutTabsComponent extends BaseComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup | undefined;

  currentBreakPoint: BreakPointsEnum = 0;

  constructor(
    private commonService: CommonService
  ) {super()}

  ngOnInit(): void {
    this.initBreakpoint();
  }

  initBreakpoint = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakPoint = res;
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
