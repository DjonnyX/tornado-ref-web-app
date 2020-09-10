import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalsEditorContainer } from './terminals-editor.container';

describe('TerminalsEditorContainer', () => {
  let component: TerminalsEditorContainer;
  let fixture: ComponentFixture<TerminalsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
