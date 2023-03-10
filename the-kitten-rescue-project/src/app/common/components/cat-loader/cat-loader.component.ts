import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cat-loader',
  templateUrl: './cat-loader.component.html',
  styleUrls: ['./cat-loader.component.scss']
})
export class CatLoaderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CatLoaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
