import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-pet-info',
  templateUrl: './adopt-form-pet-info.component.html',
  styleUrls: ['./adopt-form-pet-info.component.scss']
})
export class AdoptFormPetInfoComponent extends BaseComponent implements OnInit {

  constructor() {super() }

  ngOnInit(): void {
  }

  next = () => {
    console.log('next')
  }

  back = () => {
    console.log('back')
  }

}
