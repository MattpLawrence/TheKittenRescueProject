import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerRouterComponent } from './volunteer-router.component';

describe('VolunteerRouterComponent', () => {
  let component: VolunteerRouterComponent;
  let fixture: ComponentFixture<VolunteerRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
