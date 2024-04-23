import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TreeGraphDataService } from '../../services/tree-graph-data.service';
import * as d3 from 'd3';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NodeDetails, TreeNode } from '../../models/tree-node-model';
import { PopupComponent } from "../../popUp/popup/popup.component";

@Component({
    selector: 'app-tree-graph',
    standalone: true,
    templateUrl: './tree-graph.component.html',
    styleUrl: './tree-graph.component.css',
    imports: [CommonModule, HttpClientModule, PopupComponent]
})
export class TreeGraphComponent implements OnInit{
  @ViewChild('treeContainer', { static: true }) treeContainer!: ElementRef;
  showDetails:boolean =false;
  nodeInfo!: NodeDetails;
  constructor(private treeGraphDataService: TreeGraphDataService) {}

  ngOnInit() {
    // Fetch the data when the component initializes
     this.treeGraphDataService.getGrapData().subscribe((graphdata) => {
      this.createTree(graphdata);
    });
  }

  onBackgroundClick(event: MouseEvent) {
      this.showDetails = false;
  }

  createTree(data: TreeNode) {
    // Explicitly define the width and height for the SVG
    const width = 600;
    const height = 400;

    const svg = d3
      .select(this.treeContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create a D3 hierarchy with the provided data, with a specific type
    const root: d3.HierarchyNode<TreeNode> = d3.hierarchy(data);

    // Define the tree layout, with the same type as the root
    const treeLayout = d3.tree<TreeNode>().size([height, width - 100]);

    treeLayout(root);

    // Nodes
    const nodes = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.y}, ${d.x})`);

    //nodes.append('circle').attr('r', 5);
    nodes.on('click', (event, d) => {
      // 'd' represents the node data
      //alert(`Node clicked: ${d.data.name}`);
      event.stopPropagation();
      this.showDetails=true;
      this.nodeInfo={name:d.data.name, description:d.data.description};
    });

    nodes
    .append('rect')
    .attr('width', 90)
    .attr('height', 30)
    .attr('x', -90)
    .attr('y', -15)
    .style('fill', '#8e44ad')
    .style('stroke', '#333')
    .attr('rx', 5)
    .attr('ry', 5);

    nodes.append('text')
      .attr('dx', 10)
      .attr('dy', 4)
      .text((d) => d.data.name);

    // Links
    const links = svg
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', (d) => d.source.y ?? 0)
      .attr('y1', (d) => d.source.x ?? 0)
      .attr('x2', (d) => (d.target.y ?? 0)-90)
      .attr('y2', (d) => (d.target.x ?? 0))
      .style('stroke', 'black') ;      
  }
}
