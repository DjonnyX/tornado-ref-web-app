import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesAccountEditorContainer } from './licenses-account-editor.container';

describe('LicensesAccountEditorContainer', () => {
  let component: LicensesAccountEditorContainer;
  let fixture: ComponentFixture<LicensesAccountEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensesAccountEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesAccountEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
