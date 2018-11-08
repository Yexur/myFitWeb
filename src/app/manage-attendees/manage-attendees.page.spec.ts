import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendeesPage } from './manage-attendees.page';

describe('ManageAttendeesPage', () => {
  let component: ManageAttendeesPage;
  let fixture: ComponentFixture<ManageAttendeesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAttendeesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAttendeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
