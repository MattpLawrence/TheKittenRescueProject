import { Component, OnInit, Pipe , PipeTransform} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs';
import { CarouselItem } from '../../../../common/models/common.model';
import { APIService } from '../../../../common/services/api.service';
import { BaseComponent } from '../../../../common/components/base/base.component';
import { FullImageModalComponent } from '../../../../common/components/full-image-modal/full-image-modal.component';
import { CommonService } from 'src/app/common/services/common.service';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';



@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url:any) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent extends BaseComponent implements OnInit {
  icons = {
    right: faChevronRight,
    left: faChevronLeft
  }
  currentPet: any = undefined;
  carouselList: CarouselItem[] | undefined;
  currentId: number = 0;
  isClickable: boolean = true;
  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;

  constructor(
    private apiService:APIService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) {super() }

  ngOnInit(): void {
    this.initPetList();
    this.initBreakpoints();
  }

  initPetList = () => {
    this.apiService.getCurrentAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentPet = res

      this.initCarousel(res)
    })
  }

  initCarousel = (petObject: any) => {
    //set outer variables
    let counter:number = 0;
    let carouselList: CarouselItem[] = [];
    //extract image data
    petObject.photos.forEach( (img:any) => {

      let carouselItem: CarouselItem = {
        imgSource: img.medium,
        isIframe: false,
        id: counter,
        fullImgSource: img.large
      }
      carouselList.push(carouselItem)
      counter += 1;
    })

    //add videos to photo string
    this.extractVideoData(counter, carouselList, petObject);

  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
    })
  }

  extractVideoData = (counter: number, carouselList: CarouselItem[], petObject: any ) => {

    //if there are videos
    if(petObject.videos.length > 0){
      
      petObject.videos.forEach( (video:any) => {
        let carouselItem: CarouselItem = {
          imgSource: this.getStringAfterSpecificString( video.embed, `src="`),
          isIframe: true,
          id: counter,
          iframeSrc: this.getStringAfterSpecificString(video.embed, `src="`),
          aHref: this.getStringAfterSpecificString(video.embed, `href="`),
        }
        carouselList.push(carouselItem);
        counter += 1;
      })
      this.carouselList = carouselList;
    }else{ 
      this.carouselList = carouselList;
    }
    return
  }

  //"<iframe title="Video" src="https://www.youtube.com/embed/I5fTrzZpze0?enablejsapi=1" frameborder="0" allowfullscreen></iframe>"


  getStringAfterSpecificString(originalString: string, specificString:string):string {
    var startIndex = originalString.indexOf(specificString);
    if (startIndex === -1) {
      return '';
    }
    startIndex = startIndex + specificString.length;
    var endIndex = originalString.indexOf('"', startIndex);
    if (endIndex === -1) {
      return '';
    }
    return originalString.substring(startIndex, endIndex);
  }
  

  navigate = (isNext: boolean) => {
    //handle multiple fast clicks for css smoothness
    if(this.isClickable){

      //set is clickable to false
      this.isClickable = false;
      //run timer to re-enable after half second
      setTimeout(() => {
        this.isClickable = true;
      }, 300);
  
      let length: number | undefined = this.carouselList?.length;
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
