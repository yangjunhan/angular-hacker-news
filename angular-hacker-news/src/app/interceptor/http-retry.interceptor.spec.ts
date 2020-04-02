import { TestBed } from '@angular/core/testing';

import { HttpRetryInterceptor } from './http-retry.interceptor';

describe('HttpRetryInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpRetryInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpRetryInterceptor = TestBed.inject(HttpRetryInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
