import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';
import { takeUntil} from 'rxjs';

@Component({
  selector: 'app-donate-tabs',
  templateUrl: './donate-tabs.component.html',
  styleUrls: ['./donate-tabs.component.scss']
})
export class DonateTabsComponent extends BaseComponent implements OnInit {

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