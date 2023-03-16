import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-pet-info',
  templateUrl: './adopt-form-pet-info.component.html',
  styleUrls: ['./adopt-form-pet-info.component.scss']
})
export class AdoptFormPetInfoComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) {super() }

  ngOnInit(): void {
  }

  next = () => {
    console.log('next')
  }

  back = () => {
    this.router.navigate(['adopt-page/form-home-info']);
  }

}
