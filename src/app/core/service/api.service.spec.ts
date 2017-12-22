import { TestBed, inject } from '@angular/core/testing';

import { ApiUrlService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlService]
    });
  });

  it('should be created', inject([ApiUrlService], (service: ApiUrlService) => {
    expect(service).toBeTruthy();
  }));
});
