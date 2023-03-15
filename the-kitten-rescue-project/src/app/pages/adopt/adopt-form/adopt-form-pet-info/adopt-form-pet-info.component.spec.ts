import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptFormPetInfoComponent } from './adopt-form-pet-info.component';

describe('AdoptFormPetInfoComponent', () => {
  let component: AdoptFormPetInfoComponent;
  let fixture: ComponentFixture<AdoptFormPetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptFormPetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptFormPetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
