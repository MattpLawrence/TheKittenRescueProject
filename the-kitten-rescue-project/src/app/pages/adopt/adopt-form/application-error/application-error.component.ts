import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/components/base/base.component';

@Component({
  selector: 'app-application-error',
  templateUrl: './application-error.component.html',
  styleUrls: ['./application-error.component.scss']
})
export class ApplicationErrorComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) {super() }

  ngOnInit(): void {
  }

  continue = () => {
    this.router.navigate(['adopt-page/form-adopter-info'])
  }

}
