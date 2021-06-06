import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThemesEditorContainer } from './app-themes-editor.container';

describe('AppThemesEditorContainer', () => {
  let component: AppThemesEditorContainer;
  let fixture: ComponentFixture<AppThemesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppThemesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppThemesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
