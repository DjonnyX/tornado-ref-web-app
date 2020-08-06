import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesEditorContainer } from './currencies-editor.container';

describe('CurrenciesEditorContainer', () => {
  let component: CurrenciesEditorContainer;
  let fixture: ComponentFixture<CurrenciesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
