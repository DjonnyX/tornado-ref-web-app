import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesEditorComponent } from './licenses-editor.component';

describe('LicensesEditorComponent', () => {
  let component: LicensesEditorComponent;
  let fixture: ComponentFixture<LicensesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
