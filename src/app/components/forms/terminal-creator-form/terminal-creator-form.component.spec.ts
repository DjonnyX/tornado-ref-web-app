import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCreatorFormComponent } from './terminal-creator-form.component';

describe('TerminalCreatorFormComponent', () => {
  let component: TerminalCreatorFormComponent;
  let fixture: ComponentFixture<TerminalCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
