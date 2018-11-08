import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationModalPage } from './location-modal.page';

describe('LocationModalPage', () => {
  let component: LocationModalPage;
  let fixture: ComponentFixture<LocationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
