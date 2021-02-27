import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckuesEditorContainer } from './checkues-editor.container';

describe('CheckuesEditorContainer', () => {
  let component: CheckuesEditorContainer;
  let fixture: ComponentFixture<CheckuesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckuesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckuesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
