import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptFormAdopterInfoComponent } from './adopt-form-adopter-info.component';

describe('AdoptFormAdopterInfoComponent', () => {
  let component: AdoptFormAdopterInfoComponent;
  let fixture: ComponentFixture<AdoptFormAdopterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptFormAdopterInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptFormAdopterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
