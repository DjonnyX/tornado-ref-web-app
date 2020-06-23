import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermOfUseContainer } from './term-of-use.container';

describe('TermOfUseContainer', () => {
  let component: TermOfUseContainer;
  let fixture: ComponentFixture<TermOfUseContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermOfUseContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermOfUseContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
