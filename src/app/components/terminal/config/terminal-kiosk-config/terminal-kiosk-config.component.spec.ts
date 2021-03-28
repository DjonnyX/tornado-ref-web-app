import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalKioskConfigComponent } from './terminal-kiosk-config.component';

describe('TerminalKioskConfigComponent', () => {
  let component: TerminalKioskConfigComponent;
  let fixture: ComponentFixture<TerminalKioskConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalKioskConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalKioskConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
