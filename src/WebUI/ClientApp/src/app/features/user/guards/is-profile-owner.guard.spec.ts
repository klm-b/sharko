import { TestBed } from '@angular/core/testing';

import { IsProfileOwnerGuard } from './is-profile-owner.guard';

describe('IsProfileOwnerGuard', () => {
  let guard: IsProfileOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsProfileOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
