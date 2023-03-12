import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-full-image-modal',
  templateUrl: './full-image-modal.component.html',
  styleUrls: ['./full-image-modal.component.scss']
})
export class FullImageModalComponent extends BaseComponent implements OnInit {

  currentImage: string = ''

  constructor(
    public dialogRef: MatDialogRef<FullImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {super() }

  ngOnInit(): void {
    this.initImage()
  }

  initImage = () => {
    console.log(this.data)
    console.log(this.data.image)

    this.currentImage = this.data.image;
  }

}
