import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDaysPickerComponent } from './week-days-picker.component';

describe('WeekDaysPickerComponent', () => {
  let component: WeekDaysPickerComponent;
  let fixture: ComponentFixture<WeekDaysPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDaysPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDaysPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
