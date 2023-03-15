import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptAnimalListComponent } from './adopt-animal-list.component';

describe('AdoptAnimalListComponent', () => {
  let component: AdoptAnimalListComponent;
  let fixture: ComponentFixture<AdoptAnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptAnimalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptAnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
