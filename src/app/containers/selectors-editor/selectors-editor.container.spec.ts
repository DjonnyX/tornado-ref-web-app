import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorsEditorContainer } from './selectors-editor.container';

describe('SelectorsEditorContainer', () => {
  let component: SelectorsEditorContainer;
  let fixture: ComponentFixture<SelectorsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
