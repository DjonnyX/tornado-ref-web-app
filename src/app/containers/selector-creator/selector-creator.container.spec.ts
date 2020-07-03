import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCreatorContainer } from './selector-creator.container';

describe('SelectorCreatorContainer', () => {
  let component: SelectorCreatorContainer;
  let fixture: ComponentFixture<SelectorCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
