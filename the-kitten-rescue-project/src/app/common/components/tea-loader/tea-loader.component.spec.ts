import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaLoaderComponent } from './tea-loader.component';

describe('TeaLoaderComponent', () => {
  let component: TeaLoaderComponent;
  let fixture: ComponentFixture<TeaLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeaLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
