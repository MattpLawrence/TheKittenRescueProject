import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptFormHomeInfoComponent } from './adopt-form-home-info.component';

describe('AdoptFormHomeInfoComponent', () => {
  let component: AdoptFormHomeInfoComponent;
  let fixture: ComponentFixture<AdoptFormHomeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptFormHomeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptFormHomeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
