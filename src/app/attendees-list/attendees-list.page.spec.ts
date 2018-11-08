import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesListPage } from './attendees-list.page';

describe('AttendeesListPage', () => {
  let component: AttendeesListPage;
  let fixture: ComponentFixture<AttendeesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
