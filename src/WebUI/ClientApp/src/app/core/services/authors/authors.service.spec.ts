/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorsService } from './authors.service';

describe('Service: Authors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorsService]
    });
  });

  it('should ...', inject([AuthorsService], (service: AuthorsService) => {
    expect(service).toBeTruthy();
  }));
});
