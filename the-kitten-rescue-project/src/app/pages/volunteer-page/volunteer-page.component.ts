import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss']
})
export class VolunteerPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {


  }

}

