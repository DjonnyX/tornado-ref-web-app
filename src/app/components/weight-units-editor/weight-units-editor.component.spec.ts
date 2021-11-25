import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitsEditorComponent } from './weight-units-editor.component';

describe('WeightUnitsEditorComponent', () => {
  let component: WeightUnitsEditorComponent;
  let fixture: ComponentFixture<WeightUnitsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
