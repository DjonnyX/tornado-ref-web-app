import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsEditorContainer } from './subscriptions-editor.container';

describe('SubscriptionsEditorContainer', () => {
  let component: SubscriptionsEditorContainer;
  let fixture: ComponentFixture<SubscriptionsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
