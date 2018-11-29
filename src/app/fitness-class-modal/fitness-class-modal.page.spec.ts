import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessClassModalPage } from './fitness-class-modal.page';

describe('FitnessClassModalPage', () => {
  let component: FitnessClassModalPage;
  let fixture: ComponentFixture<FitnessClassModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessClassModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessClassModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
