import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeTreeItemComponent } from './node-tree-item.component';

describe('NodeTreeItemComponent', () => {
  let component: NodeTreeItemComponent;
  let fixture: ComponentFixture<NodeTreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeTreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
