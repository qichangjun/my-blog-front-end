import { TestBed, inject } from '@angular/core/testing';

import { ServiceHandleService } from './service-handle.service';

describe('ServiceHandleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceHandleService]
    });
  });

  it('should be created', inject([ServiceHandleService], (service: ServiceHandleService) => {
    expect(service).toBeTruthy();
  }));
});
