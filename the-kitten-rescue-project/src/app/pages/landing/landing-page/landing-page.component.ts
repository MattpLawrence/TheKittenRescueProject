import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends BaseComponent implements OnInit {

  currentString: string = 'From rescued to adopted - Helping kittens find their way home, one paw at a time.'
  // initialString: string = 'Helping kittens find their way home, one paw at a time.'
  i:number = 0;
  constructor() {super() }

  ngOnInit(): void {
    // this.initTypeWriter()
  }

  // initTypeWriter = () => {


  //   if(this.i < this.initialString.length){
  //     //add character
  //     this.currentString += this.initialString.charAt(this.i);
  //     //go to next character
  //     this.i++;
  //     //pause then call function again until last character
  //     setTimeout(() => this.initTypeWriter(), 50)
  //   }
  // }

}
