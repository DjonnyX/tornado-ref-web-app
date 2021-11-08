import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCreatorContainer } from './subscription-creator.container';

describe('SubscriptionCreatorContainer', () => {
  let component: SubscriptionCreatorContainer;
  let fixture: ComponentFixture<SubscriptionCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
