export interface TreeNode {
  name: string;
  description: string;
  children?: TreeNode[];
}

export interface NodeDetails {
  name: string;
  description: string;
}

export interface treeContainerWithPopUpInfo {
  treeContainer: any;
  nodeInfo: string;
  showDetails: boolean;
} 