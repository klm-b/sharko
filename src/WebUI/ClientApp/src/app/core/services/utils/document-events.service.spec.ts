/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentEventsService } from './document-events.service';

describe('Service: DocumentEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentEventsService]
    });
  });

  it('should ...', inject([DocumentEventsService], (service: DocumentEventsService) => {
    expect(service).toBeTruthy();
  }));
});
