import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tea-loader',
  templateUrl: './tea-loader.component.html',
  styleUrls: ['./tea-loader.component.scss']
})
export class TeaLoaderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TeaLoaderComponent>,
  ) { }

  ngOnInit(): void {
  }

}
