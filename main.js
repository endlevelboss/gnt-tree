var MainWindow = React.createClass({
    getInitialState: function() {
        return { 
            content: this.props.database,
            mainwindow: null,
        };
    },
    return: function() {
        this.setState({mainwindow: null });
    },
    birth: function() {
        this.setState( { mainwindow: <NewEvent eventtemplate={christning} return={this.return} /> });
    },
    updateme: function(e) {
        test = this.state.content;
        test[e.target.id].value = e.target.value;
        this.setState({content: test});
        database = this.state.content;
        console.log(database);
    },
    render: function() {
        return(
            <div>
            <button onClick={this.birth}>{Labels['birth']}</button>
            {this.state.mainwindow}
            </div>
        );
    }
});  

function redraw() {
    React.render(
        <MainWindow database={database} />, document.getElementById('main')
    )
};

redraw();