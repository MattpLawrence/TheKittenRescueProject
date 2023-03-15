import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptRouterComponent } from './adopt-router.component';

describe('AdoptRouterComponent', () => {
  let component: AdoptRouterComponent;
  let fixture: ComponentFixture<AdoptRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
