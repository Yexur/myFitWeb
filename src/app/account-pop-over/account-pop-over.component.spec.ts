import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPopOverComponent } from './account-pop-over.component';

describe('AccountPopOverComponent', () => {
  let component: AccountPopOverComponent;
  let fixture: ComponentFixture<AccountPopOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPopOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
