import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';



@Component({
  selector: 'app-landing-cards',
  templateUrl: './landing-cards.component.html',
  styleUrls: ['./landing-cards.component.scss']
})
export class LandingCardsComponent extends BaseComponent implements OnInit {



  constructor(
    private router: Router
  ) {super() }

  ngOnInit(): void {
  }

  navigate = (page:string) => {
    this.router.navigate([page]);
  }

}
