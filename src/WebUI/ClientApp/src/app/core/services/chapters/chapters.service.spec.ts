/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChaptersService } from './chapters.service';

describe('Service: Chapters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChaptersService]
    });
  });

  it('should ...', inject([ChaptersService], (service: ChaptersService) => {
    expect(service).toBeTruthy();
  }));
});
