import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesAccountEditorComponent } from './licenses-account-editor.component';

describe('LicensesAccountEditorComponent', () => {
  let component: LicensesAccountEditorComponent;
  let fixture: ComponentFixture<LicensesAccountEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensesAccountEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesAccountEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
