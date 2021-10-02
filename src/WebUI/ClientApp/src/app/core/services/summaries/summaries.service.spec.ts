/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SummariesService } from './summaries.service';

describe('Service: Summaries', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummariesService]
    });
  });

  it('should ...', inject([SummariesService], (service: SummariesService) => {
    expect(service).toBeTruthy();
  }));
});
