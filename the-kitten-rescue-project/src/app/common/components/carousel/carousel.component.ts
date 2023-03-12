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
  carouselImages: string[] = [
    "https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200/0_PUSS-IN-BOOTS.jpg",
    "https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-photos-of-cats-cuddling-1593203046.jpg"
  ];

  videoString:string = `"<iframe title="Video" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen name="vidly-frame" src="https://s.vid.ly/embeded.html?link=k9b0b1&autoplay=false"><a target="_blank" href="https://vid.ly/k9b0b1"><img src="https://cf.cdn.vid.ly/k9b0b1/poster.jpg" /></a></iframe>"`

  carouselList: CarouselItem[] | undefined;

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
    //eventually grab an observable;

    console.log(petObject)
    //set outer variables
    let counter:number = 0;
    let carouselList: CarouselItem[] = [];

    //extract image data
    petObject.photos.forEach( (img:any) => {

      let carouselItem: CarouselItem = {
        imgSource: img.large,
        isIframe: false,
        id: counter
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
  
  

}
