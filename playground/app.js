class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: []
        };

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({options}));
            }
        } catch (e) {
            // Do nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length != this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('component will unmount');
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((currentOption) => currentOption != optionToRemove)
        }))
    }

    handleAddOption(newOption) {
        if (!newOption) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(newOption) > -1) {
            return 'This item already exists';
        } 

        this.setState((prevState) => ({
            options: prevState.options.concat(newOption)
        }));
    }

    handlePick() {
        const randomIndex = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomIndex];
        alert(option);
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick} />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption} />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}>
                What should I do?
            </button>
        </div>
    );
}

const Options = (props) => {
    const options = props.options.map((option) => (
        <Option
            key={option}
            option={option}
            handleDeleteOption={props.handleDeleteOption}
        />
    ));

    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {options.length <= 0 && <p>Please add an option to get started!</p>}
            {options}
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            {props.option}
            <button onClick={(e) => {
                props.handleDeleteOption(props.option);
            }}>Remove</button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };

        this.handleAddOption = this.handleAddOption.bind(this);
    }

    handleAddOption(e) {
        e.preventDefault();

        const targetObject = e.target.elements.option;

        const option = targetObject.value.trim();

        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        targetObject.value = '';
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

var appRoot = document.getElementById('app');

ReactDOM.render(
    <IndecisionApp />,
    appRoot
);
