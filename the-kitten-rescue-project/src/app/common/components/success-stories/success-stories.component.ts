import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SuccessCarouselItem } from '../../models/common.model';
import { BreakPointsEnum } from '../../models/common.enum';
import { APIService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { takeUntil } from 'rxjs';
import { FullImageModalComponent } from '../full-image-modal/full-image-modal.component';


interface Carousels {
  [key: string]: SuccessCarouselItem[];
}

interface Ids {
  [key: string]: number;
}
@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss']
})
export class SuccessStoriesComponent extends BaseComponent implements OnInit {

  currentPet: any = undefined;
  
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
    {
      id: 5,
      imgSource: '../../../../assets/images/daisyBed.jpg',
      fullImgSource: '../../../../assets/images/daisyBed.jpg',
    },
    {
      id: 6,
      imgSource: '../../../../assets/images/eliza.jpg',
      fullImgSource: '../../../../assets/images/eliza.jpg',
    },
  ]

  //set list of carousels
  carousels: Carousels = {
    rn: this.rnCarouselList,
  }
  //set list of ids for each carousel
  currentId: Ids = {
    rn: 0,
  };

  intervals: {[interval: string]: any} = {};

  isClickable: boolean = true;
  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;

  constructor(
    private apiService:APIService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) { super(); }

  ngOnInit(): void {
    this.initBreakpoints();
    this.initScroll()
  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
    })
  }

  initScroll = () => {

    //create object of intervals for each carousel
    Object.keys(this.carousels).forEach((key) => {
      this.intervals[key] = setInterval(() => {
        //every interval scroll to next image
        this.currentId[key] != this.carousels[key].length - 1? this.currentId[key] += 1 : this.currentId[key] = 0
      }, 5000)

    })

  }

  navigate = (isNext: boolean, carouselKey: string) => {
    //handle multiple fast clicks for css smoothness
    if(this.isClickable){
      //set is clickable to false
      this.isClickable = false;
      //run timer to re-enable after half second
      setTimeout(() => {
        this.isClickable = true;
      }, 300);
  
      let length: number | undefined = this.carousels[carouselKey as keyof Carousels].length;
      if(length !== undefined){
  
        if(isNext){
          let nextId = this.currentId[carouselKey] + 1;
          if(nextId <= length -1) this.currentId[carouselKey] = nextId;
          else this.currentId[carouselKey] = 0;
        }else{
          let lastId = this.currentId[carouselKey] - 1;
          if(lastId >= 0)this.currentId[carouselKey] = lastId;
          else this.currentId[carouselKey] = length -1;
        }
      }
      //reset interval timer
      clearInterval(this.intervals[carouselKey]);
      //restart interval
      this.intervals[carouselKey] = setInterval(() => {
        //every interval scroll to next image
        this.currentId[carouselKey] != this.carousels[carouselKey].length - 1? this.currentId[carouselKey] += 1 : this.currentId[carouselKey] = 0
      }, 5000)
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
