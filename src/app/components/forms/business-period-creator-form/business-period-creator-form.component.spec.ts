import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPeriodCreatorFormComponent } from './business-period-creator-form.component';

describe('BusinessPeriodCreatorFormComponent', () => {
  let component: BusinessPeriodCreatorFormComponent;
  let fixture: ComponentFixture<BusinessPeriodCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPeriodCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPeriodCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
