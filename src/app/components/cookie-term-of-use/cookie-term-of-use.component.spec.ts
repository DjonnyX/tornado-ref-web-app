import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieTermOfUseComponent } from './cookie-term-of-use.component';

describe('CookieTermOfUseComponent', () => {
  let component: CookieTermOfUseComponent;
  let fixture: ComponentFixture<CookieTermOfUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieTermOfUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieTermOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
