import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCreatorFormComponent } from './ad-creator-form.component';

describe('AdCreatorFormComponent', () => {
  let component: AdCreatorFormComponent;
  let fixture: ComponentFixture<AdCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
