import { TestBed } from '@angular/core/testing';

import { TaskDelGiornoService } from './task-del-giorno.service';

describe('TaskDelGiornoService', () => {
  let service: TaskDelGiornoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDelGiornoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
