import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreatorFormComponent } from './tag-creator-form.component';

describe('TagCreatorFormComponent', () => {
  let component: TagCreatorFormComponent;
  let fixture: ComponentFixture<TagCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
