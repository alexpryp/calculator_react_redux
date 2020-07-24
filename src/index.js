import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { reducer } from './redux/reducer.js';
import './index.css';
import {getSquareRoot, performOperation} from './additFunctions.js';
import {
  setValue,
  setSecondValue,
  setOperator,
  setFloat,
  setNegative,
  setOperatorEntered,
  setResultDisplayed,
} from './redux/actionCreators.js';
//import { throwStatement, forInStatement } from '@babel/types';

const store = createStore(reducer);

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.setValue = this.props.setValue;
        this.setSecondValue = this.props.setSecondValue;
        this.setOperator = this.props.setOperator;
        this.setFloat = this.props.setFloat;
        this.setNegative = this.props.setNegative;
        this.setOperatorEntered = this.props.setOperatorEntered;
        this.setResultDisplayed = this.props.setResultDisplayed;

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
        if (this.props.value.length >= 15) {
            return;
        };

		const dataValue = attributesObj["data-value"]["value"];

        if (this.props.operatorEntered || this.props.resultDisplayed) {
          this.setValue("0");
          this.setOperatorEntered(false);
          this.setResultDisplayed(false);
          this.setFloat(false);
          this.setNegative(false);
        };

        if (dataValue === "." && this.props.float === false) {
          if (this.props.value === "-") {
            this.setValue("-0.");
            this.setFloat(true);
          } else {
            this.setValue(this.props.value + dataValue);
            this.setFloat(true);
          }
        } else if (dataValue === "." && this.props.float === true) {
            return;
        } else if (dataValue === "-+" && this.props.negative === false) {
            if (this.props.value === "0") {
              this.setValue("-");
              this.setNegative(true);
            } else {
              this.setValue("-" + this.props.value);
              this.setNegative(true);
            }
        } else if(dataValue === "-+" && this.props.negative === true) {
          this.setValue(this.props.value.slice(1));
          this.setNegative(false);
        } else if (this.props.value === "0") {
          this.setValue(dataValue);
        } else {
            if (this.props.value === "-0") {
                this.setValue("-" + dataValue);
            } else {
                if (this.props.operatorEntered || this.props.resultDisplayed) {
                    this.setValue("" + dataValue);
                } else {
                    this.setValue(this.props.value + dataValue);
                }
            }
        }
      } else if (attributesObj.hasOwnProperty("data-operator")) {
          const dataOperator = attributesObj["data-operator"]["value"];

          if (dataOperator === "c") {
            this.setValue("0");
            this.setSecondValue("");
            this.setOperator("");
            this.setFloat(false);
            this.setNegative(false);
            this.setOperatorEntered(false);
            this.setResultDisplayed(false);
          } else if (dataOperator === "backspace") {
              if (this.props.value === "0") {
                  return;
              } else if (this.props.value === "-" || this.props.value.length === 1 ) {
                this.setValue("0");
                this.setFloat(false);
                this.setNegative(false);
              } else if (this.props.value[this.props.value.length - 1] === ".") {
                this.setValue(this.props.value.slice(0, -1));
                this.setFloat(false);
              } else {
                this.setValue(this.props.value.slice(0, -1));
              }
          } else if (dataOperator === "=") {
              if (this.props.operator === "") {
                  return;
              } else {
                const result = performOperation(this.props.value, this.props.secondValue, this.props.operator);

                this.setValue("" + result);
                this.setSecondValue("");
                this.setOperator("");
                this.setFloat(false);
                this.setNegative(false);
                this.setOperatorEntered(false);
                this.setResultDisplayed(true);
              }
          } else if (dataOperator === "sqrt") {
            this.setValue("" + getSquareRoot(this.props.value));
            this.setOperator("");
            this.setOperatorEntered(false);
            this.setFloat(false);
            this.setNegative(false);
            this.setResultDisplayed(true);
          } else {
              if (this.props.secondValue !== "") {
                let result = performOperation(this.props.value, this.props.secondValue, this.props.operator);

                this.setValue("" + result);
                this.setSecondValue("" + result);
                this.setOperator(dataOperator);
                this.setFloat(false);
                this.setNegative(false);
                this.setOperatorEntered(true);
                this.setResultDisplayed(false);
              } else {
                this.setValue("0");
                this.setSecondValue(this.props.value);
                this.setOperator(dataOperator);
                this.setOperatorEntered(true);
                this.setFloat(false);
                this.setNegative(false);
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
                <div className="display">{this.props.value}</div>
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

const putStateToProps = (state) => {
  return {
    value: state.value,
    secondValue: state.secondValue,
    operator: state.operator,
    float: state.float,
    negative: state.negative,
    operatorEntered: state.operatorEntered,
    resultDisplayed: state.resultDisplayed,
  };
};

const putActionsToProps = (dispatch) => {
  return {
    setValue: bindActionCreators(setValue, dispatch),
    setSecondValue: bindActionCreators(setSecondValue, dispatch),
    setOperator: bindActionCreators(setOperator, dispatch),
    setFloat: bindActionCreators(setFloat, dispatch),
    setNegative: bindActionCreators(setNegative, dispatch),
    setOperatorEntered: bindActionCreators(setOperatorEntered, dispatch),
    setResultDisplayed: bindActionCreators(setResultDisplayed, dispatch)
  };
};

const WrappedCalculator = connect(putStateToProps, putActionsToProps)(Calculator);

ReactDOM.render(
  <Provider store={store}>
    <WrappedCalculator />
  </Provider>, 
  document.getElementById('root')
);