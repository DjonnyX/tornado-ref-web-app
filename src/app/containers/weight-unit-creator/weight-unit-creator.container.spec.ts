import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitCreatorContainer } from './weight-unit-creator.container';

describe('WeightUnitCreatorContainer', () => {
  let component: WeightUnitCreatorContainer;
  let fixture: ComponentFixture<WeightUnitCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
