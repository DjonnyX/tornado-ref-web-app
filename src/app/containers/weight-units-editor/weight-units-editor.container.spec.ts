import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitsEditorContainer } from './weight-units-editor.container';

describe('WeightUnitsEditorContainer', () => {
  let component: WeightUnitsEditorContainer;
  let fixture: ComponentFixture<WeightUnitsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
