import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';
import { ModalClose, PetBio } from 'src/app/common/models/common.model';
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
  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;

  constructor(
    public dialogRef: MatDialogRef<PetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: APIService,
    private commonService: CommonService,
    private router: Router
  ) {
    super();
    // Push a state to the history to enable the popstate event to close modal on back button
    history.pushState(null, "", window.location.href);
    window.addEventListener('popstate', () => {
      this.dialogRef.close();
    });
   }

  @HostListener('window:keyup.esc') onKeyUp() {
    //if no top modal is open
    if(!this.hasOpenModal.isOpen && !this.hasOpenModal.hasTriggered)this.dialogRef.close('goForward');
  }

  ngOnInit(): void {
    this.initPet();
    this.initTopModalListener();
    this.initBreakpoint();
  }

  initPet = () => {
    this.apiService.getCurrentAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {


      //build typed object:
      let typedPet: PetBio = {
        id: res.id,
        name: res.name,
        age: res.age,
        gender: res.gender,
        status: res.status,
        size: res.size,
        tags: res.tags, 
        description: res.description,
        coat: res.coat, 
        isHouseTrained: res.attributes.house_trained,
        hasCurrentShots: res.attributes.shots_current,
        isSpayedNeutered: res.attributes.spayed_neutered,
        hasSpecialNeeds: res.attributes.special_needs,
        colors: res.colors.primary,
        isCatFriendly: res.environment.cats != null? res.environment.cats : null,
        isDogFriendly: res.environment.dogs != null? res.environment.cats : null,
        isChildFriendly: res.environment.children != null? res.environment.cats : null,
        url: res.url
      }
      console.log(typedPet)
      this.currentPet = typedPet
    })
  }

  initTopModalListener = () => {
    this.commonService.getTopModalSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.hasOpenModal = res;
    })
  }

  initBreakpoint = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res;
    })
  }

  close = () => {
    this.dialogRef.close();
  }

  navigate = () => {
    this.dialogRef.close();
    this.router.navigate(['adopt-page/form-adopter-info'])
  }


}
