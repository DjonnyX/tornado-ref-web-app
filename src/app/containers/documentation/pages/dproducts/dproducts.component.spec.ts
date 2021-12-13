import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DProductsComponent } from './dproducts.component';

describe('DProductsComponent', () => {
  let component: DProductsComponent;
  let fixture: ComponentFixture<DProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
