import React from 'react';
import AddOption from './add-option';
import Option from './option';
import Options from './options';
import Action from './action';
import Header from './header';
import OptionModal from './option-modal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((currentOption) => currentOption != optionToRemove)
        }))
    };

    handleAddOption = (newOption) => {
        if (!newOption) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(newOption) > -1) {
            return 'This item already exists';
        } 

        this.setState((prevState) => ({
            options: prevState.options.concat(newOption)
        }));
    };

    handlePick = () => {
        const randomIndex = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomIndex];
        this.setState(() => ({
            selectedOption: option
        }));
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    };

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

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick} />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption} />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                    <OptionModal
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption} />
                </div>
            </div>
        );
    }
}