import { TestBed } from '@angular/core/testing';

import { TreeGraphDataService } from './tree-graph-data.service';

describe('TreeGraphDataService', () => {
  let service: TreeGraphDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeGraphDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
