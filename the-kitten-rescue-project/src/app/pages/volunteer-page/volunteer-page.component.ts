import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericActionModalComponent } from 'src/app/common/components/generic-action-modal/generic-action-modal.component';

@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss']
})
export class VolunteerPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(GenericActionModalComponent, {
      disableClose: true,
    })
  }

}

