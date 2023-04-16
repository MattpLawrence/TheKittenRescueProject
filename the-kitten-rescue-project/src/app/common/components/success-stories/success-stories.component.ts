import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { CarouselItem, SuccessCarouselItem } from '../../models/common.model';
import { BreakPointsEnum } from '../../models/common.enum';
import { APIService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { takeUntil } from 'rxjs';
import { FullImageModalComponent } from '../full-image-modal/full-image-modal.component';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss']
})
export class SuccessStoriesComponent extends BaseComponent implements OnInit {

  currentPet: any = undefined;
  carouselList: SuccessCarouselItem[] | undefined;
  rnCarouselList: SuccessCarouselItem[] = [
    {
      id: 0,
      imgSource: '../../../../assets/images/ButterNut.jpg',
      fullImgSource: '../../../../assets/images/ButterNut.jpg',
    },
    {
      id: 1,
      imgSource: '../../../../assets/images/buttersMoney.jpg',
      fullImgSource: '../../../../assets/images/buttersMoney.jpg',
    },
    {
      id: 2,
      imgSource: '../../../../assets/images/christmasButters.jpg',
      fullImgSource: '../../../../assets/images/christmasButters.jpg',
    },
    {
      id: 3,
      imgSource: '../../../../assets/images/fuzzyWumps.jpg',
      fullImgSource: '../../../../assets/images/fuzzyWumps.jpg',
    },
    {
      id: 4,
      imgSource: '../../../../assets/images/fuzzyWumpWumps.jpg',
      fullImgSource: '../../../../assets/images/fuzzyWumpWumps.jpg',
    },
  ]
  currentId: number = 0;
  isClickable: boolean = true;
  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;

  constructor(
    private apiService:APIService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) { super(); }

  ngOnInit(): void {
    this.initBreakpoints();
  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
    })
  }

  navigate = (isNext: boolean, carousel: SuccessCarouselItem[]) => {
    //handle multiple fast clicks for css smoothness
    if(this.isClickable){

      //set is clickable to false
      this.isClickable = false;
      //run timer to re-enable after half second
      setTimeout(() => {
        this.isClickable = true;
      }, 300);
  
      let length: number | undefined = carousel.length;
      if(length !== undefined){
  
        if(isNext){
          let nextId = this.currentId + 1;
          if(nextId <= length -1) this.currentId = nextId;
        }else{
          let lastId = this.currentId - 1;
          if(lastId >= 0)this.currentId = lastId;
  
        }
      }
    }
  }

  imageClick = (image: string | undefined) => {

    if(image != undefined && this.currentBreakpoint <= 1){

      //let top bottom modal know not to close on esc
      this.commonService.setTopModalSubject({isOpen:true, hasTriggered: false});

      let dialogRef = this.dialog.open(FullImageModalComponent, {
        disableClose: false,
        panelClass: "fitImage",
        maxHeight: '95vh',
        maxWidth: '100vw',
        data: {
          image: image
        }
      })
  
      dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        this.commonService.setTopModalSubject({isOpen:false, hasTriggered: true});
      })
    }
  }

}
