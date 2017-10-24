import React from 'react';
import Option from './option';

const Options = (props) => {
    const options = props.options.map((option, index) => (
        <Option
            count={index + 1}
            key={option}
            option={option}
            handleDeleteOption={props.handleDeleteOption}
        />
    ));

    return (
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">Your Options</h3>
                <button
                    onClick={props.handleDeleteOptions}
                    className="button button--link">
                    Remove All
                </button>
            </div>
            {options.length <= 0 &&
                <p className="widget__message">Please add an option to get started!</p>}
            {options}
        </div>
    );
}

export default Options;