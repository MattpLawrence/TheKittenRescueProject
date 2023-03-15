import { Component, HostListener, Inject, OnInit } from '@angular/core';
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

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close('goForward');
  }

  initImage = () => {
    this.currentImage = this.data.image;
  }

  close = () => {
    this.dialogRef.close();
  }

}
