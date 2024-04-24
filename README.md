# VisualizeGraph

<!--INSTALLATION : -->
<!-- PLEASE RUN NPM INSTALL COMMAND FOR EACH PACKAGE.JSON IN EACH DIRECTORY! PLEASE LOOK AT THE COMMANDS BELOW-->
<!--ROOT_DIR is the directory of the VisualizeGraph root folder which includes clients app,server app-->
<!--pre-condition: this project needs node.js>

git clone  https://github.com/kgokcedlek/VisualizeGraph.git

cd [ROOT_DIR]
    npm install
    cd graphDataServerApp/ && npm install
    cd ..
    cd visualizeGraph/ && npm install

<!--RUN-->
cd [ROOT_DIR]
    npm run dev



<!----------------------------------------------------------------->
<!----------------------------------------------------------------->
<!----------------------------------------------------------------->
<!----------------------------------------------------------------->
<!--ABOUT THE PROJECT-->

--The client and server side are the two primary components of this project.
 
 <!----CLIENT APP:---->
 <!----------------------------->
    Angular and TypeScript were used in its development.
    Under the visualizeGraph file are the project files.
    The UI's tree graph was created using the D3.js library.
<!-- Components: -->
    App.component: is the main component.
    Tree-graph.component: This is the part that shows the tree graph.
    Popup component: This displays node details (name and description) in a dialog-style format.

<!-- Models: -->
    Tree-node-models: there are some model interfaces used throughout the project
    Tree-graph-factory: This is the class where d3.js is used to generate the tree graph structure.

<!-- services: -->
    Tree-graph-data-service: in this service sample graph data is taken from the server endpoint for using  in the client application.
    Popup service: It has popup functionalities which are opening and closing the popup.


 <!----SERVEE APP:---->
 <!----------------------------->

    There are three primary parts of the server app.

    server.js: Here, the endpoint is specified and the data  with correct hierarchy  is served. 
    data-converter.js: Here is where the sample graph data gets transformed into a hierarchical structure
    grap-data.json: This is where the sample graph data is stored.
