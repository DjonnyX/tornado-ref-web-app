import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsEditorContainer } from './integrations-editor.container';

describe('IntegrationsEditorContainer', () => {
  let component: IntegrationsEditorContainer;
  let fixture: ComponentFixture<IntegrationsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
