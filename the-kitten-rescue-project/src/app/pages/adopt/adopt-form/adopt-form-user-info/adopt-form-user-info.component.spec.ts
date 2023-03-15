import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptFormUserInfoComponent } from './adopt-form-user-info.component';

describe('AdoptFormUserInfoComponent', () => {
  let component: AdoptFormUserInfoComponent;
  let fixture: ComponentFixture<AdoptFormUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptFormUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptFormUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
