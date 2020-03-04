import { TestBed } from '@angular/core/testing';

import { HackerNewsApiService } from './hacker-news-api.service';

describe('HackerNewsApiService', () => {
  let service: HackerNewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerNewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
