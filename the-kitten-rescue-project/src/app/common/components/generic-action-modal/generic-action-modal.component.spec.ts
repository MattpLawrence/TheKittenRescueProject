import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../modules/material.module';
import { ActionModalActions } from '../../models/utility.enum';



import { GenericActionModalComponent } from './generic-action-modal.component';

describe('GenericActionModalComponent', () => {
  let component: GenericActionModalComponent;
  let fixture: ComponentFixture<GenericActionModalComponent>;

  let fakeDialogMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericActionModalComponent],
      imports: [
        HttpClientModule,
        FormsModule,        
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [MatDialog, MatDialogModule,
        {
          provide: MAT_DIALOG_DATA, useValue: {
            title: 'exampleTitle',
            action: ActionModalActions.Custom,
            bodyText: 'exampleBody',
            goForwardButton: 'exampleForward',
            goBackButton: 'exampleBack',
          }
        },
        {provide: MatDialogRef, useValue: fakeDialogMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('find action in switch case', () => {
    it('should switch custom', () => {

      component.data.action = ActionModalActions.Custom;

      component.initAction();

      expect(component.currentAction).toBe("CUSTOM");
    });
    it('should switch Delete', () => {

      component.data.action = ActionModalActions.Delete;

      component.initAction();

      expect(component.currentAction).toBe("DELETE");
    });
    it('should switch remove', () => {

      component.data.action = ActionModalActions.Remove;

      component.initAction();

      expect(component.currentAction).toBe("REMOVE");
    });
    it('should switch closeDrawer', () => {

      component.data.action = ActionModalActions.CloseDrawer;

      component.initAction();

      expect(component.currentAction).toBe("CLOSE_DRAWER");
    });
    it('should switch cancelEdit', () => {

      component.data.action = ActionModalActions.CancelEdit;

      component.initAction();

      expect(component.currentAction).toBe("CANCEL_EDIT");
    });
    it('should switch default', () => {

      component.data.action = 'remove';

      component.initAction();

      expect(component.currentAction).toBe("DEFAULT");
    });
    it('should switch default', () => {

      component.data.action = ActionModalActions.GoBack;

      component.initAction();

      expect(component.currentAction).toBe("GO_BACK");
    });
  });
});
