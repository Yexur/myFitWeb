import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDisplayNamePage } from './change-display-name.page';

describe('ChangeDisplayNamePage', () => {
  let component: ChangeDisplayNamePage;
  let fixture: ComponentFixture<ChangeDisplayNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDisplayNamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDisplayNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
