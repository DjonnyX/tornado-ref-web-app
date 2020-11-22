import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypesEditorComponent } from './license-types-editor.component';

describe('LicenseTypesEditorComponent', () => {
  let component: LicenseTypesEditorComponent;
  let fixture: ComponentFixture<LicenseTypesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseTypesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseTypesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
