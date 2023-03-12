import { Component, OnInit } from '@angular/core';
import { CarouselItem } from '../../models/common.model';
import { petObject } from '../../models/dummyData';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent extends BaseComponent implements OnInit {

  carouselImages: string[] = [
    "https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200/0_PUSS-IN-BOOTS.jpg",
    "https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-photos-of-cats-cuddling-1593203046.jpg"
  ];

  videoString:string = `"<iframe title="Video" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen name="vidly-frame" src="https://s.vid.ly/embeded.html?link=k9b0b1&autoplay=false"><a target="_blank" href="https://vid.ly/k9b0b1"><img src="https://cf.cdn.vid.ly/k9b0b1/poster.jpg" /></a></iframe>"`

  carouselList: CarouselItem[] | undefined;

  constructor() {super() }

  ngOnInit(): void {
    this.initCarousel()
    console.log('hit')
  }

  initCarousel = () => {
    //eventually grab an observable;

    petObject
    let counter:number = 0;
    let carouselList: CarouselItem[] = [];

    petObject.photos.forEach( (img) => {

      let carouselItem: CarouselItem = {
        imgSource: img.large,
        isIframe: false,
        id: counter
      }
      carouselList.push(carouselItem)
      counter += 1;

    })

    console.log(carouselList)
    let originalString: string = `"<iframe title="Video" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen name="vidly-frame" src="https://s.vid.ly/embeded.html?link=g2s0u5&autoplay=false"><a target="_blank" href="https://vid.ly/g2s0u5"><img src="https://cf.cdn.vid.ly/g2s0u5/poster.jpg" /></a></iframe>"`;

    let specificString: string = `frame" src="`

    console.log(this.getStringAfterSpecificString(originalString, specificString))

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
