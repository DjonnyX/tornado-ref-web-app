import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesEditorComponent } from './currencies-editor.component';

describe('CurrenciesEditorComponent', () => {
  let component: CurrenciesEditorComponent;
  let fixture: ComponentFixture<CurrenciesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
