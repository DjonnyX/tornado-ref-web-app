import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCreatorContainer } from './currency-creator.container';

describe('CurrencyCreatorContainer', () => {
  let component: CurrencyCreatorContainer;
  let fixture: ComponentFixture<CurrencyCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
