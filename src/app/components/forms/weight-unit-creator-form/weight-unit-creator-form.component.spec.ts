import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitCreatorFormComponent } from './weight-unit-creator-form.component';

describe('WeightUnitCreatorFormComponent', () => {
  let component: WeightUnitCreatorFormComponent;
  let fixture: ComponentFixture<WeightUnitCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
