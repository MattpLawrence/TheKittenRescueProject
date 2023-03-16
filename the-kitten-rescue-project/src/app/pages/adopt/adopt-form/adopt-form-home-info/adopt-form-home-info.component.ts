import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-home-info',
  templateUrl: './adopt-form-home-info.component.html',
  styleUrls: ['./adopt-form-home-info.component.scss']
})
export class AdoptFormHomeInfoComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) {super() }

  ngOnInit(): void {
  }


  next = () => {
    this.router.navigate(['adopt-page/form-pet-info']);
  }

  back = () => {
    this.router.navigate(['adopt-page/form-adopter-info']);
  }
}
