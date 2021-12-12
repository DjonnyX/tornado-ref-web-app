import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAdsComponent } from './dads.component';

describe('DAdsComponent', () => {
  let component: DAdsComponent;
  let fixture: ComponentFixture<DAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
