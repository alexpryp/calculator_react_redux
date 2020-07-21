import {
    SET_VALUE,
    SET_SECOND_VALUE,
    SET_OPERATOR,
    SET_FLOAT,
    SET_NEGATIVE,
    SET_OPERATOR_ENTERED,
    SET_RESULT_DISPLAYED,
} from "./actionTypes.js";

const initialState = {
    value: "0",
    secondValue: "",
    operator: "",
    float: false,
    negative: false,
    operatorEntered: false,
    resultDisplayed: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALUE:
            return { ...state, value: action.payload };
        case SET_SECOND_VALUE:
            return { ...state, secondValue: action.payload };
        case SET_OPERATOR:
            return { ...state, operator: action.payload };
        case SET_FLOAT:
            return { ...state, float: action.payload };
        case SET_NEGATIVE:
            return { ...state, negative: action.payload };
        case SET_OPERATOR_ENTERED:
            return { ...state, operatorEntered: action.payload };
        case SET_RESULT_DISPLAYED:
            return { ...state, resultDisplayed: action.payload };
        default:
            return state;
    }
};