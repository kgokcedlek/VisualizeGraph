import { Injectable, model } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { TreeNode } from '../models/tree-node-model';
@Injectable({
  providedIn: 'root'
})
export class TreeGraphDataService {

  private apiUrl = 'http://localhost:3000/api/samplegraphdata'; // Endpoint to fetch data

  private sampleGraphData$ = new Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.sampleGraphData$ = this.httpClient.get(this.apiUrl);
  }

  public getGrapData(): Observable<TreeNode> {
    return this.sampleGraphData$.pipe(
      map((data: any) => {
        return data as TreeNode; // This simple cast works if the data matches TreeNode
      })
    );
  }
}
