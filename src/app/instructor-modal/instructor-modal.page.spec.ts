import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorModalPage } from './instructor-modal.page';

describe('InstructorModalPage', () => {
  let component: InstructorModalPage;
  let fixture: ComponentFixture<InstructorModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
