import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPeriodsEditorComponent } from './business-periods-editor.component';

describe('BusinessPeriodsEditorComponent', () => {
  let component: BusinessPeriodsEditorComponent;
  let fixture: ComponentFixture<BusinessPeriodsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPeriodsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPeriodsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
