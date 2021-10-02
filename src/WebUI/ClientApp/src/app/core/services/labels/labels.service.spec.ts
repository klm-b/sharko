/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LabelsService } from './labels.service';

describe('Service: Labels', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabelsService]
    });
  });

  it('should ...', inject([LabelsService], (service: LabelsService) => {
    expect(service).toBeTruthy();
  }));
});
