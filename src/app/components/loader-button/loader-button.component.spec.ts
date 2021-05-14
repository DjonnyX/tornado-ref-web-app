import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderButtonComponent } from './loader-button.component';

describe('LoaderButtonComponent', () => {
  let component: LoaderButtonComponent;
  let fixture: ComponentFixture<LoaderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
