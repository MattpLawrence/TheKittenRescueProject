import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { PetDisplay } from 'src/app/common/models/common.model';
import { APIService } from 'src/app/common/services/api.service';
import { CommonService } from 'src/app/common/services/common.service';
import { PetModalComponent } from '../pet-modal/pet-modal.component';

@Component({
  selector: 'app-adopt-animal-list',
  templateUrl: './adopt-animal-list.component.html',
  styleUrls: ['./adopt-animal-list.component.scss']
})
export class AdoptAnimalListComponent extends BaseComponent implements OnInit {

  petList: PetDisplay[] | undefined;
  currentBreakpoint:BreakPointsEnum = BreakPointsEnum.isDesktop;

  animateElementList: string[] = ['adoptList1']
  animationTriggers: { [id: string]: {isShown: boolean} } = {};

  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.triggerScrollAnimation()
  }

  constructor(
    private apiService: APIService,
    public dialog: MatDialog,
    private commonService:CommonService
  ) {super() }

  ngOnInit(): void {
    this.initPetList()
    this.initBreakpoints()
    this.triggerScrollAnimation()
  }

  initPetList = () => {
    this.apiService.getAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res != undefined){
        //filter to remove any without primary photo
        let filteredList = res.animals.filter((animal: any) => animal.primary_photo_cropped != null)
        //map to get needed keys
        let petListMap = filteredList.map((animal:any) => <PetDisplay> {
          petId: animal.id,
          petName: animal.name,
          mainImg: animal.primary_photo_cropped?.full
        })
        this.petList = petListMap;
        //set animation object
        this.petList?.forEach((pet:any) => {
          this.animationTriggers[pet.petId] = {isShown: false}
        })
      }else{
        this.petList = undefined;
        //set up animation object
        this.animateElementList.forEach((id:string) => {
          this.animationTriggers[id] = {isShown: false};
        })
      }
    })
  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
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


  openModal = (pet:PetDisplay) => {
    //set subject
    this.apiService.setCurrentAnimalsSubject(pet)

    let modalWidth: string = '';

    switch(this.currentBreakpoint){
      case BreakPointsEnum.isDesktop:
        modalWidth = "90vw";
        break;

      case BreakPointsEnum.isTablet:
        modalWidth = "90vw";
        break;

      case BreakPointsEnum.isMobile:
        modalWidth = "100vw";
        break;
    }

    let dialogRef = this.dialog.open(PetModalComponent, {
      disableClose: false,
      panelClass: "overflowAuto",
      width: modalWidth,
      maxWidth: '100vw',
      data: {
        petId: pet.petId,
        petName: pet.petName,
        mainImg: pet.mainImg,
      }
    })

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {

    })

  }
}
