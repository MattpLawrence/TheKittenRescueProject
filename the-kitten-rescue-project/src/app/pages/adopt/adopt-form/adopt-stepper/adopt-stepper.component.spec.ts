import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptStepperComponent } from './adopt-stepper.component';

describe('AdoptStepperComponent', () => {
  let component: AdoptStepperComponent;
  let fixture: ComponentFixture<AdoptStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
