import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContainer } from './admin.container';

describe('LoginComponent', () => {
  let component: AdminContainer;
  let fixture: ComponentFixture<AdminContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
