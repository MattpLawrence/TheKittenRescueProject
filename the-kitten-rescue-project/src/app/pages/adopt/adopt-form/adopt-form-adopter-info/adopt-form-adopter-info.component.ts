import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-adopt-form-adopter-info',
  templateUrl: './adopt-form-adopter-info.component.html',
  styleUrls: ['./adopt-form-adopter-info.component.scss']
})
export class AdoptFormAdopterInfoComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) { super()}

  ngOnInit(): void {
  }

  next = () => {
    this.router.navigate(['adopt-page/form-home-info']);
  }

  back = () => {
    this.router.navigate(['adopt-page/home']);
  }
}
