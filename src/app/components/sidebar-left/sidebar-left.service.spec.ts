import { TestBed } from '@angular/core/testing';

import { SidebarleftService } from './sidebar-left.service';

describe('LoginService', () => {
  let service: SidebarleftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarleftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});