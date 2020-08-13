import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesEditorContainer } from './languages-editor.container';

describe('LanguagesEditorContainer', () => {
  let component: LanguagesEditorContainer;
  let fixture: ComponentFixture<LanguagesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
