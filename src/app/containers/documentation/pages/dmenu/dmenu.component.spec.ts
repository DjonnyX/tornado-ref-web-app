import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMenuComponent } from './dmenu.component';

describe('DMenuComponent', () => {
  let component: DMenuComponent;
  let fixture: ComponentFixture<DMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
