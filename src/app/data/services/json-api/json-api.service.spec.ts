import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { JsonApiService } from './json-api.service';

describe('JsonApiService', () => {
  let service: JsonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(JsonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
