import { Component, OnInit, ViewChild, ElementRef, HostListener  } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { APIService } from 'src/app/common/services/api.service';
import { takeUntil} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CatLoaderComponent } from 'src/app/common/components/cat-loader/cat-loader.component';
import { CommonService } from 'src/app/common/services/common.service';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';


@Component({
  selector: 'app-adopt-page',
  templateUrl: './adopt-page.component.html',
  styleUrls: ['./adopt-page.component.scss']
})
export class AdoptPageComponent extends BaseComponent implements OnInit {

  petList: any | undefined;
  isLoading: boolean = true;
  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;
  petText: string = 'Our Current Foster Pets';
  slideInRight: string[] = ['1st', '2nd','3rd','4th','5th','6th']

  showElementWarning:boolean = false;
  animationTriggers: { [id: string]: {isShown: boolean, class: string } } = {};

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Check if the element is in the viewport
    Object.entries(this.animationTriggers).forEach(trigger => {
      //set element to equal the id
      let element = document.getElementById(trigger[0])
      if(!this.animationTriggers[trigger[0]].isShown)this.isElementInViewport(element, trigger);
    })
  }
  

  @ViewChild('adoptList') adoptList: ElementRef |undefined;

  constructor(
    private apiService: APIService,
    private commonService: CommonService,
    public dialog: MatDialog
    ) {
      super()
      //initiate animationTriggers
      this.slideInRight.forEach((id:string) => {
        this.animationTriggers[id] = {isShown: false, class:'slideInRight'}
      })
    }

  ngOnInit(): void {

    this.initBreakpoints();

  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res
      //call find pets the first time
      if(this.isLoading) this.findPets();
    })
  }

  isElementInViewport(element: HTMLElement | null, trigger:any): boolean {

    if(element != null){
      const options = {
        root: null,
        threshold: 0.5,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(trigger)
            //set global variable to show if intersecting for first time
            this.animationTriggers[trigger[0]].isShown = true;
            return true;
          }else{
            return false
          }
        });
      }, options);
    
      observer.observe(element);
    
      return false;
    }else{
      return false;
    }
  }

  findPets = () => {

    let modalWidth: string = "50vw";

    switch(this.currentBreakpoint){
      case BreakPointsEnum.isDesktop:
        modalWidth = "50vw";
        break;

      case BreakPointsEnum.isTablet:
        modalWidth = "80vw";
        break;

      case BreakPointsEnum.isMobile:
        modalWidth = "100vw";
        break;
    }
    //init loader
    const dialogRef = this.dialog.open(CatLoaderComponent, {
      disableClose: true,
      panelClass: "noPadding",
      width: modalWidth
    })
    setTimeout(() => {
      if(!this.isLoading)dialogRef.close();
      else this.isLoading = false;
    },1800)
    this.apiService.searchAnimals().subscribe(response => {
      if(response != undefined){
        //if an error response
        if(Object.keys(response).includes('error')){
          if(this.isLoading)this.isLoading = false;
          else dialogRef.close();
          this.setNoPets();
        }else{
          if(this.isLoading)this.isLoading = false;
          else dialogRef.close();
          //make sure there is an animals object
          if(response.animals != undefined){
            //check to make sure there is at least one animal
            if(response.animals.length > 0){
              this.petList = response.animals;
            }else{
              this.setNoPets();
            }
          } 
        }
      }
    });
  }

  setNoPets = () => {
    this.apiService.setAnimalsSubject(undefined);
    this.petText = 'No One Is Looking For A Home Today'
  }

  scroll = (id:string) => {
    this.adoptList?.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start" });
  }

}
