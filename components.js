var NewEvent = React.createClass({
    getInitialState: function() {
        var myNodes = this.props.eventtemplate.map( function(item, index) {
            return new Node(item.type, item.label, item.template);
        });
        var myUpdate = this.updateEvent;
        var myContent = this.props.eventtemplate.map( function(item, index) {
            return <NewElement key={index} data={item} node={index} update={myUpdate} />
        });
        return { nodes: myNodes,
               content: myContent,
               sources: []};
    },    
    updateSource: function(value, level) {
        var val = this.state.sources;
        val[level] = value;
        this.setState({sources: val});
    },
    updateEvent: function(value, key, nodeindex) {
        var mynodes = this.state.nodes;
        mynodes[nodeindex].keyvalues[key] = value;
        this.setState({ nodes: mynodes });
    },
    click: function() {
        addToDatabase(this.state.sources, this.state.nodes);
        this.props.return();
    },
    render: function() {
        var sources = getNodesKV(database,'source', new Pair('level',0));
        return <div>
            <Source update={this.updateSource} level={0} sourcenodes={sources} />
            {this.state.content}
            <button onClick={this.click}>OK</button>
            </div>
    }
});                                                           

var Source = React.createClass({
    getInitialState: function() {
        var myContent = this.setSources();
        return {value: null,
                content: myContent,
               };
    },
    update: function(e) {
        var mycont = this.setSources(e.target.value);
        this.setState({value: e.target.value,
                     content: mycont });
        this.props.update(e.target.value, this.props.level);
        this.forceUpdate();
    },
    setSources: function(val) {
        var listName = 'sources' + this.props.level;
        var options = this.props.sourcenodes.map( function(item, index) {
            return <option key={index} value={item.value} />
        });
        
        var subcontent = null;
        if (val != null){
            var mylevel = this.props.level + 1;
            var sourcenodes = [];
            var parentnode = getNode(this.props.sourcenodes, val);
            if (parentnode != null) {
                var pair = new Pair('level', mylevel);
                sourcenodes = getNodesKV(parentnode.links, 'source', pair);
            }
            subcontent = <Source update={this.props.update} level={mylevel} sourcenodes={sourcenodes} />
        }
        var myContent = <div> <input list={listName} id={0} onChange={this.update} />
                <datalist id={listName} >
                              {options}
                </datalist> 
                {subcontent}
                </div>;
        return myContent;
    },
    render: function() {
        return <div>
            {this.state.content}
            </div>
    }
});

var Role = React.createClass({
    render: function() {
        return <div>
            {Labels[this.props.role]}: 
            <TemplateFields template={this.props.template} node={this.props.node} update={this.props.update} />
            </div>
    }
});

var Event = React.createClass({
    render: function() {
        return <div>
            {Labels[this.props.type]} <br/>
            <TextField label={'date'} node={this.props.node} update={this.props.update} /> <br/>
                {Labels['place']}:
            <TemplateFields template={this.props.template} node={this.props.node} update={this.props.update} />
            </div>
    }
});

var NewElement = React.createClass({
    getInitialState: function() {
        var myContent = null;
        if (this.props.data.type == 'event') {
            myContent = <Event type={this.props.data.label} node={this.props.node} template={this.props.data.template} update={this.props.update} />
        };
        if (this.props.data.type == 'role') {
            myContent = <Role role={this.props.data.label} template={this.props.data.template} node={this.props.node} update={this.props.update} />
        };
        return {content: myContent};
    },
    render: function() {
        return <div>
            {this.state.content}
            </div>
    }
});

var TemplateFields = React.createClass({
    render: function() {
        var update = this.props.update;
        var node = this.props.node;
        var fields = this.props.template.map(function(label, index) {
            return <TextField key={index} label={label} id={index} node={node} update={update} />
        });
        return <table>
            {fields}
            </table>
    }
});

var TextField = React.createClass({
    update: function(e) {
        this.props.update(e.target.value, this.props.label, this.props.node)
    },
    render: function() {
        return <tr>
            <td><label>{Labels[this.props.label]}: </label> </td>
            <td><input type={'text'} id={this.props.id} onChange={this.update} value={this.props.content} /> </td>
            </tr>
    }
});
