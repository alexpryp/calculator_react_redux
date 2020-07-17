import React, {  } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {getSquareRoot, performOperation} from './additFunctions.js';
//import { throwStatement, forInStatement } from '@babel/types';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "0",
            secondValue: "",
            operator: "",
            float: false,
            negative: false,
            operatorEntered: false,
            resultDisplayed: false,
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleValue = this.handleValue.bind(this);
    }

    // add button click effect
    handleMouseDown(event) {
        const target = event.target;
        const attributesObj = target.attributes;

        if (target.dataset.operator === "backspace") {
            target.closest("button.backspace-button").classList.add("dark-grey-click");
        } else if (attributesObj.hasOwnProperty("data-value")) {
            target.classList.add("button-click"); 
        } else if (attributesObj.hasOwnProperty("data-operator")) {
            if (target.classList.contains("dark-grey")) {
                target.classList.add("dark-grey-click");
            } else if (target.classList.contains("button-blue")) {
                target.classList.add("button-blue-click");
            } else if (target.classList.contains("button-orange")) {
                target.classList.add("button-orange-click");
            }
        }
    }

    // remove button click effect
    handleMouseUp(event) {
        const target = event.target;
        const attributesObj = target.attributes;

        if (target.dataset.operator === "backspace") {
            target.closest("button.backspace-button").classList.remove("dark-grey-click");
        } else if (attributesObj.hasOwnProperty("data-value")) {
            target.classList.remove("button-click"); 
        } else if (attributesObj.hasOwnProperty("data-operator")) {
            if (target.classList.contains("dark-grey")) {
                target.classList.remove("dark-grey-click");
            } else if (target.classList.contains("button-blue")) {
                target.classList.remove("button-blue-click");
            } else if (target.classList.contains("button-orange")) {
                target.classList.remove("button-orange-click");
            }
        }
    }

    handleValue(event) {
        const target = event.target;
        const attributesObj = target.attributes;

        if (attributesObj.hasOwnProperty("data-value")) {

            if (this.state.value.length >= 15) {
                return;
            };

            const dataValue = attributesObj["data-value"]["value"];

            if (this.state.operatorEntered || this.state.resultDisplayed) {
                this.setState({
                    value: "0",
                    operatorEntered: false,
                    resultDisplayed: false,
                    float: false,
                    negative: false
                });
            }

            if (dataValue === "." && this.state.float === false) {
                this.setState((state) => {
                    if (state.value === "-") {
                        return {
                            value: "-0.",
                            float: true,
                        };
                    }
                    return {
                        value: state.value + dataValue,
                        float: true,
                    };
                });
            } else if (dataValue === "." && this.state.float === true) {
                return;
            } else if (dataValue === "-+" && this.state.negative === false) {
                if (this.state.value === "0") {
                    this.setState((state) => ({
                        value: "-",
                        negative: true,
                    }));
                } else {
                    this.setState((state) => ({
                        value: "-" + state.value,
                        negative: true,
                    }));
                }
            } else if(dataValue === "-+" && this.state.negative === true) {
                this.setState((state) => ({
                    value: state.value.slice(1),
                    negative: false,
                }));
            } else if (this.state.value === "0") {
                this.setState({value: dataValue});
            } else {
                if (this.state.value === "-0") {
                    this.setState((state) => ({value: "-" + dataValue}));
                } else {
                    if (this.state.operatorEntered || this.state.resultDisplayed) {
                        this.setState((state) => ({value: "" + dataValue}));
                    } else {
                        this.setState((state) => ({value: state.value + dataValue}));
                    }
                }
            }
        } else if (attributesObj.hasOwnProperty("data-operator")) {
            const dataOperator = attributesObj["data-operator"]["value"];

            if (dataOperator === "c") {
                this.setState({
                    value: "0",
                    secondValue: "",
                    operator: "",
                    float: false,
                    negative: false,
                    operatorEntered: false,
                    resultDisplayed: false,
                });
            } else if (dataOperator === "backspace") {
                if (this.state.value === "0") {
                    return;
                } else if (this.state.value === "-" || this.state.value.length === 1 ) {
                    this.setState({
                        value: "0",
                        float: false,
                        negative: false,
                    });
                } else if (this.state.value[this.state.value.length - 1] === ".") {
                    this.setState((state) => ({
                        value: state.value.slice(0, -1),
                        float: false,
                    }));
                } else {
                    this.setState((state) => ({value: state.value.slice(0, -1)}));
                }
            } else if (dataOperator === "=") {
                if (this.state.operator === "") {
                    return;
                } else {
                    const result = performOperation(this.state.value, this.state.secondValue, this.state.operator);

                    this.setState((state) => ({
                        value: "" + result,
                        secondValue: "",
                        operator: "",
                        float: false,
                        negative: false,
                        operatorEntered: false,
                        resultDisplayed: true,
                    }));
                }
            } else if (dataOperator === "sqrt") {
                this.setState((state) => ({
                    value: "" + getSquareRoot(state.value),
                    operator: "",
                    operatorEntered: false,
                    float: false,
                    negative: false,
                    resultDisplayed: true,
                }));
            } else {
                if (this.state.secondValue !== "") {
                    let result = performOperation(this.state.value, this.state.secondValue, this.state.operator);

                    this.setState((state) => ({
                        value: "" + result,
                        secondValue: "" + result,
                        operator: dataOperator,
                        float: false,
                        negative: false,
                        operatorEntered: true,
                        resultDisplayed: false,
                    }));
                } else {
                    this.setState((state) => ({
                        secondValue: state.value,
                        value: "0",
                        operator: dataOperator,
                        operatorEntered: true,
                        float: false,
                        negative: false,
                    }));
                }
            }
        }
    }

    render() {
        return (
            <div className="calculator">
                <div className="indicator">
                    <div className="battery">
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>
                    <div className="logo">CALCULATOR</div>
                </div>
                <div className="display">{this.state.value}</div>
                <div className="buttons-panel" 
                    onClick={this.handleValue} 
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onTouchStart={this.handleMouseDown}
                    onTouchEnd={this.handleMouseUp}
                >
                    <div className="buttons-row">
                        <button className="button-blue" data-operator="c">C</button>
                        <button className="dark-grey" data-operator="/">&#247;</button>
                        <button className="dark-grey" data-operator="*">&#215;</button>
                        <button className="dark-grey backspace-button" data-operator="backspace"><i className="fa fa-backspace" data-operator="backspace"></i></button>
                    </div>
                    <div className="buttons-row">
                        <button data-value="7">7</button>
                        <button data-value="8">8</button>
                        <button data-value="9">9</button>
                        <button className="dark-grey" data-operator="-">&#8722;</button>
                    </div>
                    <div className="buttons-row">
                        <button data-value="4">4</button>
                        <button data-value="5">5</button>
                        <button data-value="6">6</button>
                        <button className="dark-grey" data-operator="+">+</button>
                    </div>
                    <div className="buttons-row">
                        <button data-value="1">1</button>
                        <button data-value="2">2</button>
                        <button data-value="3">3</button>
                        <button className="dark-grey" data-operator="sqrt">&#8730;</button>
                    </div>
                    <div className="buttons-row">
                        <button data-value="0">0</button>
                        <button data-value=".">.</button>
                        <button data-value="-+">&#177;</button>
                        <button className="button-orange" data-operator="=">=</button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
