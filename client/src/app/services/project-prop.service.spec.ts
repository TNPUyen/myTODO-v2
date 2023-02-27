import { TestBed } from '@angular/core/testing';

import { ProjectPropService } from './project-prop.service';

describe('ProjectPropService', () => {
  let service: ProjectPropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
