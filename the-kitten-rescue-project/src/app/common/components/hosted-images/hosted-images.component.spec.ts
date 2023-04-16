import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostedImagesComponent } from './hosted-images.component';

describe('HostedImagesComponent', () => {
  let component: HostedImagesComponent;
  let fixture: ComponentFixture<HostedImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostedImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
