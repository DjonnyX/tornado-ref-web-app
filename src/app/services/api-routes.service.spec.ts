import { TestBed } from '@angular/core/testing';

import { ApiRoutesService } from './api-routes.service';

describe('ApiRoutesService', () => {
  let service: ApiRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
