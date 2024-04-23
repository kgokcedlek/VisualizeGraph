const express = require('express');
const cors = require('cors');
const { GraphData, convertToTree } = require("./data-converter"); // Import the module
const sampleGraphData = require("./graph-data.json"); // Load sample data from JSON file
const app = express();
app.use(cors()); // Enable CORS for all origins

  // Convert the sample data to GraphData instances
const graphData = sampleGraphData.data.map((item) => new GraphData(item));

// Convert the list of GraphData to a tree structure
const tree = convertToTree(graphData);

 // Define the GET endpoint that serves hierarchical data
 app.get('/api/samplegraphdata', (req, res) => {
    res.json(tree); // Send the hierarchical data as JSON
  });
  
  // Define the port to listen on
  const PORT = process.env.PORT || 3000;
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

