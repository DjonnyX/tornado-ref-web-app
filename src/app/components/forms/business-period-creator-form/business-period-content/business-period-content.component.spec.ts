import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPeriodContentComponent } from './business-period-content.component';

describe('BusinessPeriodContentComponent', () => {
  let component: BusinessPeriodContentComponent;
  let fixture: ComponentFixture<BusinessPeriodContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPeriodContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPeriodContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
