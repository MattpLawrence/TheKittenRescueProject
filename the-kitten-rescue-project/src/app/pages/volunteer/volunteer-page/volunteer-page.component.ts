import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { CommonService } from 'src/app/common/services/common.service';


@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss']
})
export class VolunteerPageComponent extends BaseComponent implements OnInit {

  currentBreakpoint: BreakPointsEnum = 0;

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private router: Router
    ){ super()}

  ngOnInit(): void {
    this.initBreakpoints();

  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
    })
  }


  goFoster = () => {
    this.router.navigate(['volunteer-page/form-foster']);
  }

}

