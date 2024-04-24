import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TreeGraphDataService } from '../../services/tree-graph-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from "../../popUp/popup/popup.component";
import { BehaviorSubject, Observable } from 'rxjs';
import { TreeGraph } from '../../models/tree-graph-factory';

@Component({
  selector: 'app-tree-graph',
  standalone: true,
  templateUrl: './tree-graph.component.html',
  styleUrl: './tree-graph.component.css',
  imports: [CommonModule, HttpClientModule, PopupComponent]
})
export class TreeGraphComponent implements OnInit {
  @ViewChild('treeContainer', { static: true }) treeContainer!: ElementRef;
  showDetails!: Observable<any>;
  nodeInfo!: Observable<any>
  unselectNode = new BehaviorSubject<boolean>(true);
  constructor(private treeGraphDataService: TreeGraphDataService) { }

  ngOnInit() {
    // Fetch the data when the component initializes
    this.treeGraphDataService.getGrapData().subscribe((graphdata) => {
      TreeGraph.createTree(graphdata, this.treeContainer);
      this.showDetails = TreeGraph.showDetails;
      this.nodeInfo = TreeGraph.nodeInfo
    });
  }

  unSelectNode(popUp: boolean) {
    this.unselectNode.next(popUp);
    TreeGraph.unSelectNode(popUp, this.treeContainer);
  }

}
