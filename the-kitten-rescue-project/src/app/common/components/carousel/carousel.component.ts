import { Component, OnInit, Pipe , PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs';
import { CarouselItem } from '../../models/common.model';
import { APIService } from '../../services/api.service';
import { BaseComponent } from '../base/base.component';



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

  currentPet: any = undefined;
  carouselList: CarouselItem[] | undefined;
  currentId: number = 0;
  isClickable: boolean = true;

  constructor(
    private apiService:APIService
  ) {super() }

  ngOnInit(): void {
    this.initPetList();
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
        fullImgSource: img.full
      }
      carouselList.push(carouselItem)
      counter += 1;
    })

    console.log(carouselList)

    //add videos to photo string
    this.extractVideoData(counter, carouselList, petObject);

  }

  extractVideoData = (counter: number, carouselList: CarouselItem[], petObject: any ) => {

    //if there are videos
    if(petObject.videos.length > 0){
      
      petObject.videos.forEach( (video:any) => {

        let carouselItem: CarouselItem = {
          imgSource: this.getStringAfterSpecificString( video.embed, `<img src="`),
          isIframe: true,
          id: counter,
          iframeSrc: this.getStringAfterSpecificString(video.embed, `frame" src="`),
          aHref: this.getStringAfterSpecificString(video.embed, `href="`),
        }
        carouselList.push(carouselItem);
        counter += 1;

      })
      console.log(carouselList);
      this.carouselList = carouselList;
    }else{ 
      this.carouselList = carouselList;
    }
    return
  }


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
      }, 500);
  
      let length: number | undefined = this.carouselList?.length;
      if(length !== undefined){
  
        if(isNext){
          console.log(this.currentId)
          let nextId = this.currentId + 1;
          console.log(nextId)
          if(nextId <= length -1) this.currentId = nextId;
        }else{
          console.log(this.currentId)
          let lastId = this.currentId - 1;
          console.log(lastId)
          if(lastId >= 0)this.currentId = lastId;
  
        }
  
      }
    }

  }
  

}
