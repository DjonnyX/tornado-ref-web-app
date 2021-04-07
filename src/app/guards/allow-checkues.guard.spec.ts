import { TestBed } from '@angular/core/testing';

import { AllowCheckuesGuard } from './allow-checkues.guard';

describe('AllowCheckuesGuard', () => {
  let guard: AllowCheckuesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllowCheckuesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
