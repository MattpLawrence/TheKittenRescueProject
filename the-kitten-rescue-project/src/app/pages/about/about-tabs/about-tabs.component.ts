import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-about-tabs',
  templateUrl: './about-tabs.component.html',
  styleUrls: ['./about-tabs.component.scss']
})
export class AboutTabsComponent extends BaseComponent implements OnInit {

  currentBreakPoint: BreakPointsEnum = 0;

  constructor(
    private commonService: CommonService
  ) { super() }

  ngOnInit(): void {
    this.initBreakpoint();
  }

  initBreakpoint = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakPoint = res;
    })
  }

}
