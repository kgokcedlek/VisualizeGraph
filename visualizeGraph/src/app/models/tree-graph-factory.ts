import * as d3 from 'd3';
import { BehaviorSubject, Subject } from 'rxjs';
import { NodeDetails, TreeNode } from './tree-node-model';

export class TreeGraph {

    public static showDetails = new BehaviorSubject<boolean>(false);
    public static nodeInfo = new BehaviorSubject<NodeDetails>({ name: "", description: "" });
    public static treeContainer: any;

    public static createTree(data: any, treeContainer: any) {
        this.treeContainer = treeContainer
        // Explicitly define the width and height for the SVG
        const width = 900;
        const height = 600;
        const sourceNodeWidht = 150;
        const sourceNodeHeight = 75;
        const linkStartPointCorrection = sourceNodeWidht * 3 / 2;

        const svg = d3
            .select(treeContainer.nativeElement)
            .append('svg')
            .attr('width', width)
            .attr('height', height)


        // Create a D3 hierarchy with the provided data, with a specific type
        const root: d3.HierarchyNode<TreeNode> = d3.hierarchy(data);

        // Define the tree layout, with the same type as the root
        const treeLayout = d3.tree<TreeNode>().size([height, width - sourceNodeWidht * 2]);

        treeLayout(root);

        // Nodes
        const nodes = svg
            .selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d) => {
                if (typeof d.y !== 'number' || typeof d.x !== 'number') {
                    console.error('Unexpected coordinate values', d);
                    return 'translate(0, 0)';
                }
                return `translate(${d.y + sourceNodeWidht}, ${d.x})`;
            });

        nodes
            .append('rect')
            .attr('width', sourceNodeWidht)
            .attr('height', sourceNodeHeight)
            .attr('x', -sourceNodeWidht / 2)
            .attr('y', -sourceNodeHeight / 2)
            .style('fill', '#f0f0f0')
            .style('stroke', '#ccc')
            .style("stroke-width", 3)
            .attr('rx', 5)
            .attr('ry', 5);

        nodes
            .append('text')
            .attr('x', 0) // Horizontal center
            .attr('y', 0) // Vertical center
            .attr('text-anchor', 'middle') // Horizontally center the text
            .attr('dominant-baseline', 'middle') // Vertically center the text
            .text((d) => d.data.name);


        // Links
        const links = svg
            .selectAll('.link')
            .data(root.links())
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('x1', (d) => (d.source.y ?? 0) + linkStartPointCorrection)
            .attr('y1', (d) => (d.source.x ?? 0))
            .attr('x2', (d) => (d.target.y ?? 0) + sourceNodeWidht / 2)
            .attr('y2', (d) => (d.target.x ?? 0))
            .style('stroke', '#ccc')
            .style("stroke-width", 3);

        //Actions

        nodes.on('click', function (event, d) {
            event.stopPropagation(); // Prevents click event from propagating further

            // Reset existing node/link styles
            TreeGraph.clearSelections(nodes, links);

            // Update variables (example)
            TreeGraph.setNodeDetailsPopUpInfo(true, d);

            // Highlight the selected node
            d3.select(this) // `this` refers to the DOM element (node)
                .select('rect')
                .style('fill', '#bfd7ed'); // Highlight the node

            // Highlight related links
            links
                .filter((link) => link.source === d || link.target === d) // Find links associated with the selected node
                .style('stroke', '#bfd7ed'); // Change stroke color
        });

        // Click event on the SVG to reset if clicked outside a node
        svg.on('click', function () {
            TreeGraph.clearSelections(nodes, links); // Reset node/link styles when clicking outside
            TreeGraph.setNodeDetailsPopUpInfo(false);
        });

    }

    public static unSelectNode(unselect: boolean, treeContainer: any) {
        if (!unselect) {
            const containerSelection = d3.select(treeContainer.nativeElement);
            const svg = containerSelection.select('svg');
            const nodes = svg.selectAll('.node');
            const links = svg.selectAll('.link');
            this.clearSelections(nodes, links)
            this.showDetails.next(false);
        }
    }

    private static clearSelections(nodes: any, links: any) {
        nodes.selectAll('rect').style('fill', '#f0f0f0'); //default-original color
        links.style('stroke', '#ccc'); //default-original color
    }

    private static setNodeDetailsPopUpInfo(showDetails: boolean, d?: any) {
        this.showDetails.next(showDetails);
        this.nodeInfo.next({ name: d?.data?.name, description: d?.data?.description });
    }

}