import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { ModalClose } from 'src/app/common/models/common.model';
import { APIService } from 'src/app/common/services/api.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.scss']
})
export class PetModalComponent extends BaseComponent implements OnInit {

  currentPet:any;
  hasOpenModal: ModalClose = {isOpen:false, hasTriggered: false};

  constructor(
    public dialogRef: MatDialogRef<PetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: APIService,
    private commonService: CommonService
  ) {super() }

  @HostListener('window:keyup.esc') onKeyUp() {
    //if no top modal is open
    if(!this.hasOpenModal.isOpen && !this.hasOpenModal.hasTriggered)this.dialogRef.close('goForward');
  }

  ngOnInit(): void {
    this.initPet();
    this.initTopModalListener();
  }

  initPet = () => {
    this.apiService.getCurrentAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log(res)
      this.currentPet = res
    })
  }

  initTopModalListener = () => {
    this.commonService.getTopModalSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.hasOpenModal = res;
    })
  }

  close = () => {
    this.dialogRef.close();
  }



}
