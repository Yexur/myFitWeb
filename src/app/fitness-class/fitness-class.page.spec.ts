import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessClassPage } from './fitness-class.page';

describe('FitnessClassPage', () => {
  let component: FitnessClassPage;
  let fixture: ComponentFixture<FitnessClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
