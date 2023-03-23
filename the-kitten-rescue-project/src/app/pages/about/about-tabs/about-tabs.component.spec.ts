import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTabsComponent } from './about-tabs.component';

describe('AboutTabsComponent', () => {
  let component: AboutTabsComponent;
  let fixture: ComponentFixture<AboutTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
