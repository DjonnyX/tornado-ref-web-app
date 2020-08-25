import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorContentComponent } from './selector-content.component';

describe('SelectorContentComponent', () => {
  let component: SelectorContentComponent;
  let fixture: ComponentFixture<SelectorContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
