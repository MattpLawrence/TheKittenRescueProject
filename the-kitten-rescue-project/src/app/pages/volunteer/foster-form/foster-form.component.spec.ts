import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosterFormComponent } from './foster-form.component';

describe('FosterFormComponent', () => {
  let component: FosterFormComponent;
  let fixture: ComponentFixture<FosterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FosterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
