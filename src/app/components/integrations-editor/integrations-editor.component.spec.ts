import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsEditorComponent } from './integrations-editor.component';

describe('IntegrationsEditorComponent', () => {
  let component: IntegrationsEditorComponent;
  let fixture: ComponentFixture<IntegrationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
