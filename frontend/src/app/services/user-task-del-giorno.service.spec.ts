import { TestBed } from '@angular/core/testing';

import { UserTaskDelGiornoService } from './user-task-del-giorno.service';

describe('UserTaskDelGiornoService', () => {
  let service: UserTaskDelGiornoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTaskDelGiornoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
