class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count
        };

        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleAddOne() {
        this.setState((prevState, props) => {
            return {
                count: ++prevState.count
            };
        });
    }

    handleMinusOne() {
        this.setState((prevState, props) => {
            return {
                count: --prevState.count
            };
        });
    }

    handleReset() {
        this.setState((prevState, props) => {
            return {
                count: 0
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

Counter.defaultProps = {
    count: 0
};


ReactDOM.render(<Counter />, document.getElementById('app'));
