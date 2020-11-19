import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesEditorContainer } from './licenses-editor.container';

describe('LicensesEditorContainer', () => {
  let component: LicensesEditorContainer;
  let fixture: ComponentFixture<LicensesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
