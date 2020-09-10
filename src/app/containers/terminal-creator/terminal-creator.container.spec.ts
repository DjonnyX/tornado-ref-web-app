import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCreatorContainer } from './terminal-creator.container';

describe('TerminalCreatorContainer', () => {
  let component: TerminalCreatorContainer;
  let fixture: ComponentFixture<TerminalCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
