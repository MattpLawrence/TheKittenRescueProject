import { Component, OnInit } from '@angular/core';
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

  constructor(
    private apiService: APIService,
    public dialog: MatDialog,
    private commonService:CommonService
  ) {super() }

  ngOnInit(): void {
    this.initPetList()
    this.initBreakpoints()
  }

  initPetList = () => {
    this.apiService.getAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res){
        //filter to remove any without primary photo
        let filteredList = res.animals.filter((animal: any) => animal.primary_photo_cropped != null)
        //map to get needed keys
        let petListMap = filteredList.map((animal:any) => <PetDisplay> {
          petId: animal.id,
          petName: animal.name,
          mainImg: animal.primary_photo_cropped?.full
        })
        this.petList = petListMap;
      }
    })
  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
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
      // panelClass: "noPadding",
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
