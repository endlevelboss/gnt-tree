function addToDatabase(sources, nodes) {
    var topSources = getNodesKV(database,'source', new Pair('level',0));
    var endsource = addSources(topSources, sources, 0, null);
    if (endsource == null) {
        endsource = database[0];
    }
    var sourcedetail = new Node('sourcedetail', '', null);
    database[database.length] = sourcedetail;
    linkNodes(sourcedetail, endsource);
    nodes.map(function(node) {
        database[database.length] = node;
        linkNodes(node, sourcedetail);
    });
    
    console.log(database);
}

function addSources(sourceNodes, newSources, index, parentnode) {
    if (newSources != undefined && newSources.length > index) {
        var myNode = getNode(sourceNodes, newSources[index]);
        if (myNode == null) {
            myNode = new Node('source', newSources[index], null);
            myNode.keyvalues['level'] = index;
            database[database.length] = myNode;
        }
        if (parentnode != null) {
            linkNodes(parentnode, myNode);
        }
        var subnodes = getNodesKV(myNode.links, 'source', new Pair('level', index + 1));
        myNode = addSources(subnodes, newSources, index + 1, myNode); 
        return myNode;
    } else {
        return parentnode;
    }
}

function getNodesKV(nodearray, type, keyvalue) {
    var returnvalue = [];
    nodearray.map( function(item) {
        if (item.type == type) {
            if (item.keyvalues[keyvalue.key] == keyvalue.value) {
                returnvalue[returnvalue.length] = item;
            };
        }                      
    });
    return returnvalue;
}

function getNode(nodearray, value) {
    var retvalue = null;
    nodearray.map( function(item) {
        if (item.value == value)
            retvalue = item;
    });
    return retvalue;
}

function linkNodes(nodeA, nodeB) {
    var existingLink = nodeA.links.indexOf(nodeB);
    if (existingLink == -1) {
        nodeA.links[nodeA.links.length] = nodeB;
        nodeB.links[nodeB.links.length] = nodeA;
    }
}