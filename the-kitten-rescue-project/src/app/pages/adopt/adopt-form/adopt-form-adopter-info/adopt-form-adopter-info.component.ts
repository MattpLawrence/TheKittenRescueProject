import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-adopter-info',
  templateUrl: './adopt-form-adopter-info.component.html',
  styleUrls: ['./adopt-form-adopter-info.component.scss']
})
export class AdoptFormAdopterInfoComponent extends BaseComponent implements OnInit {

  constructor() { super()}

  ngOnInit(): void {
  }

  next = () => {
    console.log('next')
  }

  back = () => {
    console.log('back')
  }
}
