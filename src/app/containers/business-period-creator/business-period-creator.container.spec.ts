import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPeriodCreatorContainer } from './business-period-creator.container';

describe('BusinessPeriodCreatorContainer', () => {
  let component: BusinessPeriodCreatorContainer;
  let fixture: ComponentFixture<BusinessPeriodCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPeriodCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPeriodCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
