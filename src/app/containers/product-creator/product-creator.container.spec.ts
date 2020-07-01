import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreatorContainer } from './product-creator.container';

describe('ProductCreatorContainer', () => {
  let component: ProductCreatorContainer;
  let fixture: ComponentFixture<ProductCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
