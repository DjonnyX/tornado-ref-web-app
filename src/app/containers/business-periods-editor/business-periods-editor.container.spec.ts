import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPeriodsEditorContainer } from './business-periods-editor.container';

describe('BusinessPeriodsEditorContainer', () => {
  let component: BusinessPeriodsEditorContainer;
  let fixture: ComponentFixture<BusinessPeriodsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPeriodsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPeriodsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
