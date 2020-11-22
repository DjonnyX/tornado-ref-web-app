import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypesEditorContainer } from './license-types-editor.container';

describe('LicenseTypesEditorContainer', () => {
  let component: LicenseTypesEditorContainer;
  let fixture: ComponentFixture<LicenseTypesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseTypesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseTypesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
