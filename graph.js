var myNode = new Node('unsourced', 'Missing source', null);
var database = [myNode];

function Pair(key, value) {
    this.key = key;
    this.value = value;
}

function Node(type, value, template) {
    this.type = type;
    this.value = value;
    this.template = template;
    this.keyvalues = {};
    this.links = [];
}

function UpdateNode(index, value) {
    if (database[index] == null)
        database[index] = new Node('name',value);
    else
        database[index].value = value;
}