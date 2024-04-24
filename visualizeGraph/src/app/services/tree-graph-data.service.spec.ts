import { TestBed } from '@angular/core/testing';

import { TreeGraphDataService } from './tree-graph-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('TreeGraphDataService', () => {
  let service: TreeGraphDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TreeGraphDataService],
    });
    service = TestBed.inject(TreeGraphDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
