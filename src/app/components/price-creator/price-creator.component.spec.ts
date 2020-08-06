import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCreatorComponent } from './price-creator.component';

describe('PriceCreatorComponent', () => {
  let component: PriceCreatorComponent;
  let fixture: ComponentFixture<PriceCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
