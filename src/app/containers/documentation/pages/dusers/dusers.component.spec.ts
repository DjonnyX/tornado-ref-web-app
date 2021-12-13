import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DUsersComponent } from './dusers.component';

describe('DUsersComponent', () => {
  let component: DUsersComponent;
  let fixture: ComponentFixture<DUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
