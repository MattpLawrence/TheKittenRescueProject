import { Component, OnInit, HostListener  } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { BreakPointsEnum } from '../../models/common.enum';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent extends BaseComponent implements OnInit {

  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;
  isExpanded: boolean = false;
  prevY = window.scrollY;
  isHidden: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private commonService: CommonService
  ) {
    super();
   }

  readonly breakpoint$ = this.breakpointObserver
  .observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
  .pipe(
    tap(),
    distinctUntilChanged()
  );

  @HostListener('window:scroll', ['$event'])
  onScroll(event:any){
    console.log(window.scrollY)
    //compare current scroll position to previous
    let currentY = window.scrollY;
    if( this.prevY > currentY){
      this.isHidden = false;
    } else{
      this.isHidden = true;
    }
    //set scroll position
    this.prevY = currentY
  }

  ngOnInit(): void {
    this.initBreakpoints();
  }

  initBreakpoints = () => {
    this.breakpoint$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.breakpointChanged())
  }


  breakpointChanged = () => {
    let currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;
    if(this.breakpointObserver.isMatched(Breakpoints.Large)) {
      currentBreakpoint = BreakPointsEnum.isDesktop;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      currentBreakpoint = BreakPointsEnum.isDesktop;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Small)) {
      currentBreakpoint = BreakPointsEnum.isTablet;
    } else if(this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      currentBreakpoint = BreakPointsEnum.isMobile;
    }
    this.commonService.setBreakpointSubject(currentBreakpoint);
    this.currentBreakpoint = currentBreakpoint;
  }

  toggleExpanded = (isLogo: boolean) => {
    if(!isLogo)this.isExpanded = !this.isExpanded;
    else this.isExpanded = false;

  }

}
