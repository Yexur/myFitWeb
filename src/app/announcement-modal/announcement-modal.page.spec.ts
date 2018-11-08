import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementModalPage } from './announcement-modal.page';

describe('AnnouncementModalPage', () => {
  let component: AnnouncementModalPage;
  let fixture: ComponentFixture<AnnouncementModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
