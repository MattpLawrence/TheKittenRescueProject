import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { CommonService } from 'src/app/common/services/common.service';



@Component({
  selector: 'app-landing-cards',
  templateUrl: './landing-cards.component.html',
  styleUrls: ['./landing-cards.component.scss']
})
export class LandingCardsComponent extends BaseComponent implements OnInit {

  animateElementList: string[] = ['aboutCard', 'volunteerCard','adoptCard','donateCard']
  animationTriggers: { [id: string]: {isShown: boolean} } = {};
  isMobile: boolean = false;

  
  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.triggerScrollAnimation()
  }

  constructor(
    private router: Router,
    private commonService: CommonService,
  ) {
    super()
    //set up animation object
    this.animateElementList.forEach((id:string) => {
      this.animationTriggers[id] = {isShown: false};
    })
  }


  ngOnInit(): void {
    this.triggerScrollAnimation();
    this.initBreakpoints();
  }

  triggerScrollAnimation = () => {
    // Check if the element is in the viewport
    Object.entries(this.animationTriggers).forEach(trigger => {
      //set element to equal the id
      let element = document.getElementById(trigger[0])
      //if not already shown
      if(!this.animationTriggers[trigger[0]].isShown){
        //if id is attached to an html element
        if(element != null){
          const options = {
            root: null,
            threshold: .2,
          };
          //set up individual observer for each element
          const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
              //set global variable to show if intersecting for first time
              this.animationTriggers[trigger[0]].isShown = true;
            }
          }, options);
          observer.observe(element);
        };
      };
    })
  }


  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      res !== 0? this.isMobile = true: this.isMobile = false;
    })
  }

  navigate = (page:string) => {
    this.router.navigate([page]);
  }

}
