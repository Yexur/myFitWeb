import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessClassTemplateModalPage } from './fitness-class-template-modal.page';

describe('FitnessClassTemplateModalPage', () => {
  let component: FitnessClassTemplateModalPage;
  let fixture: ComponentFixture<FitnessClassTemplateModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessClassTemplateModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessClassTemplateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
