import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioEntityEditorComponent } from './scenario-entity-editor.component';

describe('ScenarioEntityEditorComponent', () => {
  let component: ScenarioEntityEditorComponent;
  let fixture: ComponentFixture<ScenarioEntityEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioEntityEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioEntityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
