import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThemeCreatorContainer } from './app-theme-creator.container';

describe('AppThemeCreatorContainer', () => {
  let component: AppThemeCreatorContainer;
  let fixture: ComponentFixture<AppThemeCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppThemeCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppThemeCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
