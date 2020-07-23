import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioEditorItemComponent } from './scenario-editor-item.component';

describe('ScenarioEditorItemComponent', () => {
  let component: ScenarioEditorItemComponent;
  let fixture: ComponentFixture<ScenarioEditorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioEditorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioEditorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
