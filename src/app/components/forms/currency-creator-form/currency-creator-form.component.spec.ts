import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCreatorFormComponent } from './currency-creator-form.component';

describe('CurrencyCreatorFormComponent', () => {
  let component: CurrencyCreatorFormComponent;
  let fixture: ComponentFixture<CurrencyCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
