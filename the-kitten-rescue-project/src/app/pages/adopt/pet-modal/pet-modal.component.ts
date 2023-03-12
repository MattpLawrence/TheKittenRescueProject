import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { APIService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.scss']
})
export class PetModalComponent extends BaseComponent implements OnInit {

  currentPet:any;

  constructor(
    public dialogRef: MatDialogRef<PetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: APIService
  ) {super() }

  ngOnInit(): void {
    this.initPetList();
  }

  initPetList = () => {
    this.apiService.getCurrentAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentPet = res
    })
  }




}
