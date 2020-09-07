import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCreatorContainer } from './ad-creator.container';

describe('AdCreatorContainer', () => {
  let component: AdCreatorContainer;
  let fixture: ComponentFixture<AdCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
