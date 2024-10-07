import { TestBed } from '@angular/core/testing';

import { SingService } from './sing.service';

describe('SingService', () => {
  let service: SingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
