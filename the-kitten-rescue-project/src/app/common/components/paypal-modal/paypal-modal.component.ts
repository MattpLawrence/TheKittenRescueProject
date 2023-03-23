import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-paypal-modal',
  templateUrl: './paypal-modal.component.html',
  styleUrls: ['./paypal-modal.component.scss']
})
export class PaypalModalComponent extends BaseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaypalModalComponent>,
  ) {super() }

  ngOnInit(): void {
  }

}
