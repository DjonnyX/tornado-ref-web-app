import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitContentComponent } from './weight-unit-content.component';

describe('WeightUnitContentComponent', () => {
  let component: WeightUnitContentComponent;
  let fixture: ComponentFixture<WeightUnitContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
