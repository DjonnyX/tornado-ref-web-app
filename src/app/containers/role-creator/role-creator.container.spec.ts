import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCreatorContainer } from './role-creator.container';

describe('RoleCreatorContainer', () => {
  let component: RoleCreatorContainer;
  let fixture: ComponentFixture<RoleCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
