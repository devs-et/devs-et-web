import { TestBed } from '@angular/core/testing';

import { UsersCrudService } from './users-crud.service';

describe('UsersCrudService', () => {
  let service: UsersCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
