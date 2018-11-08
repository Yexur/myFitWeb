import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessTypeModalPage } from './fitness-type-modal.page';

describe('FitnessTypeModalPage', () => {
  let component: FitnessTypeModalPage;
  let fixture: ComponentFixture<FitnessTypeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessTypeModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessTypeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
