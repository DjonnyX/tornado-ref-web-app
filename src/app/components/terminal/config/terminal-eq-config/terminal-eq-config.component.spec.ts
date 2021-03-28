import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalEQConfigComponent } from './terminal-eq-config.component';

describe('TerminalEQConfigComponent', () => {
  let component: TerminalEQConfigComponent;
  let fixture: ComponentFixture<TerminalEQConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalEQConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalEQConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
