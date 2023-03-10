import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum ActionModalActions { 
  "Custom",
  "Delete",
  "Remove",
  "CloseDrawer",
  "CancelEdit",
  'GoBack'
}

@Component({
  selector: 'app-generic-action-modal',
  templateUrl: './generic-action-modal.component.html',
  styleUrls: ['./generic-action-modal.component.scss']
})
export class GenericActionModalComponent implements OnInit {

  // title = this.data.title;
  // action = this.data.action;
  // bodyText = this.data.bodyText
  // goForwardButton = this.data.goForwardButton;
  // goBackButton = this.data.goBackButton;
  // currentAction: string = this.data.action

  constructor(
    public dialogRef: MatDialogRef<GenericActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.initAction();
  };

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close('goForward');
  }

  initAction(){
    // switch (this.data.action){
    //   case(ActionModalActions.Custom):
    //     this.currentAction = "CUSTOM";
    //     break;

    //   case(ActionModalActions.Delete
    //     ):
    //     this.currentAction = "DELETE";
    //     break;

    //   case(ActionModalActions.Remove):
    //   this.currentAction = "REMOVE";
    //     break;

    //   case(ActionModalActions.CloseDrawer):
    //   this.currentAction = "CLOSE_DRAWER";
    //     break;

    //   case(ActionModalActions.CancelEdit):
    //   this.currentAction = "CANCEL_EDIT";
    //     break;

    //   case(ActionModalActions.GoBack):
    //   this.currentAction = "GO_BACK";
    //   break;

    //   default:
    //     this.currentAction = "DEFAULT";
    // }
  }

  goBack(){
    this.data.generic.direction = 'goBack';
  };


  goForward(){
    this.data.generic.direction = 'goForward';
  };

}
