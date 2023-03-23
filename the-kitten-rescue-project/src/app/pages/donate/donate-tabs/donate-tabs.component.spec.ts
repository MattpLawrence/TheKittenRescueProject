import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateTabsComponent } from './donate-tabs.component';

describe('DonateTabsComponent', () => {
  let component: DonateTabsComponent;
  let fixture: ComponentFixture<DonateTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
