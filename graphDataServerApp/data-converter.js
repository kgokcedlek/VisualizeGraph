  class GraphData{  
    constructor(jsondata)
    {
      this.name = jsondata.name;
      this.description = jsondata.description;
      this.parent = jsondata.parent;
    }
  
   get Name(){
    return this.name;
    }

   get Description(){
      return this.description;
      }

   get Parent(){
        return this.parent;
        }
  }

   function convertToTree(data) {
     // Step 1: Create a map to hold the nodes by name for easy lookup
     const nodeMap= {};
   
     // Step 2: Create initial nodes for each entry in the data
     data.forEach((item) => {
       nodeMap[item.Name] = {
         name: item.Name,
         description:item.Description,
         children: [],
       };
     });
   
     // Step 3: Build the tree by assigning children to their respective parents
     let rootNode = null;
   
     data.forEach((item) => {
       if (item.Parent) {
         const parentNode = nodeMap[item.Parent];
         if (parentNode) {
           // If the parent node exists, add the current node to its children
           parentNode.children.push(nodeMap[item.Name]);
         }
       } else {
         // If no parent, it's the root node
         rootNode = nodeMap[item.Name];
       }
     });
   
     if (rootNode) {
       return rootNode;
     } else {
       throw new Error("No root node found");
     }
   }

   module.exports = {
    GraphData,
    convertToTree,
  };