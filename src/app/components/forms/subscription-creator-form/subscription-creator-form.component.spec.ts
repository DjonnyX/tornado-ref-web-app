import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCreatorFormComponent } from './subscription-creator-form.component';

describe('SubscriptionCreatorFormComponent', () => {
  let component: SubscriptionCreatorFormComponent;
  let fixture: ComponentFixture<SubscriptionCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
