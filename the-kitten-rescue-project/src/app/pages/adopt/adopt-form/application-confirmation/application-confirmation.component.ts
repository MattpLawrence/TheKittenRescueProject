import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-application-confirmation',
  templateUrl: './application-confirmation.component.html',
  styleUrls: ['./application-confirmation.component.scss']
})
export class ApplicationConfirmationComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) {super() }

  ngOnInit(): void {
  }

  continue = () => {
    this.router.navigate(['about-page'])
  }

}
