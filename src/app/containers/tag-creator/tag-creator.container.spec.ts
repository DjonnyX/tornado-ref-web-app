import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreatorContainer } from './tag-creator.container';

describe('TagCreatorContainer', () => {
  let component: TagCreatorContainer;
  let fixture: ComponentFixture<TagCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
