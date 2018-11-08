import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessClassMenuComponent } from './fitness-class-menu.component';

describe('FitnessClassMenuComponent', () => {
  let component: FitnessClassMenuComponent;
  let fixture: ComponentFixture<FitnessClassMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessClassMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessClassMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
