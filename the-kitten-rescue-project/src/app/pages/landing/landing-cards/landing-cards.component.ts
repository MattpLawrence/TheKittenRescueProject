import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';



@Component({
  selector: 'app-landing-cards',
  templateUrl: './landing-cards.component.html',
  styleUrls: ['./landing-cards.component.scss']
})
export class LandingCardsComponent extends BaseComponent implements OnInit {

  animateElementList: string[] = ['aboutCard', 'volunteerCard','adoptCard','donateCard']
  animationTriggers: { [id: string]: {isShown: boolean} } = {};

  
  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.triggerScrollAnimation()
  }

  constructor(
    private router: Router
  ) {
    super()
    //set up animation object
    this.animateElementList.forEach((id:string) => {
      this.animationTriggers[id] = {isShown: false};
    })
  }


  ngOnInit(): void {
    this.triggerScrollAnimation();
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
            threshold: .5,
          };
          //set up individual observer for each element
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                //set global variable to show if intersecting for first time
                this.animationTriggers[trigger[0]].isShown = true;
              }
            });
          }, options);
          observer.observe(element);
        };
      };
    })
  }

  navigate = (page:string) => {
    this.router.navigate([page]);
  }

}
