import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DModifiersComponent } from './dmodifiers.component';

describe('DModifiersComponent', () => {
  let component: DModifiersComponent;
  let fixture: ComponentFixture<DModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DModifiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
