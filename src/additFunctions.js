export const mathOperations = {
    "/": function (a, b) {
        return b / a;
    },
    "*": function (a, b) {
        return b * a;
    },
    "-": function (a, b) {
        return b - a;
    },
    "+": function (a, b) {
        return b + a;
    }
}

export function roundNumber (number) {
    const allowedNumberOfCharacters = 15;

    if (number.length <= allowedNumberOfCharacters) {
        return (+number);
    }

    number = +number;
    if (number % 1) {
        number = "" + number;
        let pointPosition = number.indexOf(".") + 1;
        let numberOfCharactersAfterPoint = allowedNumberOfCharacters - pointPosition;

        if (numberOfCharactersAfterPoint < 0) {
            numberOfCharactersAfterPoint = 0;
        }
        number = +number;

        return +(number.toFixed(numberOfCharactersAfterPoint));
    } else {
        number = "" + number;
        return number.slice(0, allowedNumberOfCharacters - 5) + "E+" + (number.length - (allowedNumberOfCharacters - 4));
    }
}

export function getSquareRoot (a) {
    let result = Math.sqrt(+a);

    return roundNumber(''+result);
}

export function performOperation (a, b, operation) {
    let result = 0;
    
    a = +a;
    b = +b;

    result = mathOperations[operation](a, b);

    return roundNumber("" + result);
}
