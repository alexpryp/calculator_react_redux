import {
    SET_VALUE,
    SET_SECOND_VALUE,
    SET_OPERATOR,
    SET_FLOAT,
    SET_NEGATIVE,
    SET_OPERATOR_ENTERED,
    SET_RESULT_DISPLAYED,
} from "./actionTypes.js";

export const setValue = (newValue) => {
    return {
        type: SET_VALUE,
        payload: newValue
    };
};

export const setSecondValue = (newSecondValue) => {
    return {
        type: SET_SECOND_VALUE,
        payload: newSecondValue
    };
};

export const setOperator = (newOperator) => {
    return {
        type: SET_OPERATOR,
        payload: newOperator
    };
};

export const setFloat = (newFloat) => {
    return {
        type: SET_FLOAT,
        payload: newFloat
    };
};

export const setNegative = (newNegative) => {
    return {
        type: SET_NEGATIVE,
        payload: newNegative
    };
};

export const setOperatorEntered = (newOperatorEntered) => {
    return {
        type: SET_OPERATOR_ENTERED,
        payload: newOperatorEntered
    };
};

export const setResultDisplayed = (newResultDisplayed) => {
    return {
        type: SET_RESULT_DISPLAYED,
        payload: newResultDisplayed
    };
};