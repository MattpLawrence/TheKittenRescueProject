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
  showElementWarning:boolean = false;

  animateElementList: string[] = ['adoptPage1', 'adoptPage2','adoptPage3','adoptPage4', 'adoptPage5', 'adoptPage6', 'adoptPage7']
  animationTriggers: { [id: string]: {isShown: boolean} } = {};



  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.triggerScrollAnimation()
  }
  

  @ViewChild('adoptList') adoptList: ElementRef |undefined;

  constructor(
    private apiService: APIService,
    private commonService: CommonService,
    public dialog: MatDialog
    ) {
      super()
      //initiate animationTriggers
      this.animateElementList.forEach((id:string) => {
        this.animationTriggers[id] = {isShown: false}
      })
    }

  ngOnInit(): void {
    this.initBreakpoints();
    this.triggerScrollAnimation();
  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res
      //call find pets the first time
      if(this.isLoading) this.findPets();
    })
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
            threshold: .3,
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


  findPets = () => {

    this.apiService.getAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if(response != undefined){
        //make sure there is an animals object
        if(response.animals != undefined){
          //check to make sure there is at least one animal
          if(response.animals.length > 0){
            this.petList = response.animals;
          }
        } 
        
      }
    });
    
    if(this.petList == undefined){
      
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
  }

  setNoPets = () => {
    this.apiService.setAnimalsSubject(undefined);
    this.petText = 'No One Is Looking For A Home Today'
  }

  scroll = (id:string) => {
    this.adoptList?.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start" });
  }

}
