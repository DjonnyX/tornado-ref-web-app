import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalsEditorComponent } from './terminals-editor.component';

describe('TerminalsEditorComponent', () => {
  let component: TerminalsEditorComponent;
  let fixture: ComponentFixture<TerminalsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
