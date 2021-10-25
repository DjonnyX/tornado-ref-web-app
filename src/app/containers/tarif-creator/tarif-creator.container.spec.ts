import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifCreatorContainer } from './tarif-creator.container';

describe('TarifCreatorContainer', () => {
  let component: TarifCreatorContainer;
  let fixture: ComponentFixture<TarifCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
