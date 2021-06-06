import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThemesEditorComponent } from './app-themes-editor.component';

describe('AppThemesEditorComponent', () => {
  let component: AppThemesEditorComponent;
  let fixture: ComponentFixture<AppThemesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppThemesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppThemesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
