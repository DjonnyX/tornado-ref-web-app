import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalOrderPickerConfigComponent } from './terminal-order-picker-config.component';

describe('TerminalOrderPickerConfigComponent', () => {
  let component: TerminalOrderPickerConfigComponent;
  let fixture: ComponentFixture<TerminalOrderPickerConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalOrderPickerConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalOrderPickerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
