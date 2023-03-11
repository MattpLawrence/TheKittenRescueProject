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

  petList: any ;
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
    this.apiService.getAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.petList = res.animals
      this.findPet(res.animals)
    })
  }

  findPet = (pets: any) => {
    //find the paet
    let myPet = pets.find( (pet:any) => pet.id === this.data.petId);
    console.log(myPet)
    this.currentPet = myPet;
  }

}
