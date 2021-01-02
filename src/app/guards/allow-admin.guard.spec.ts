import { TestBed } from '@angular/core/testing';

import { AllowAdminGuard } from './allow-admin.guard';

describe('AllowAdminGuard', () => {
  let guard: AllowAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllowAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
