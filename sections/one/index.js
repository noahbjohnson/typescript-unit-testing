"use strict";
/**
 * Test cases for doubleMe
 **/
const cases = [
    // Edge cases
    {
        inNum: 0,
        outNum: 0
    },
    {
        inNum: 10100000100000,
        outNum: 20200000200000
    },
    // Normal cases
    {
        inNum: 1,
        outNum: 2
    },
    {
        inNum: 331,
        outNum: 662
    },
    // Negative cases
    {
        inNum: -100,
        outNum: -200
    },
    {
        inNum: -12885,
        outNum: -25770
    }
];
/**
 * Returns an integer double the distance from zero as the input
 **/
function doubleMe(inNum) {
    return inNum + inNum;
}
/**
 * Runs a provided function with the provided positional argument and
 * checks the result against the provided expected result
 **/
function pureTest(inputValue, expectedOutputValue, functionToTest) {
    const outputValue = functionToTest(inputValue);
    if (expectedOutputValue !== outputValue) {
        console.error(`Expected output for ${inputValue} is ${expectedOutputValue}. Function returned ${outputValue}`);
    }
    else {
        console.log('ok', `${expectedOutputValue} = ${outputValue}`);
    }
}
/**
 * Call the test for each case
 */
for (const c of cases) {
    pureTest(Number(c.inNum), Number(c.outNum), doubleMe);
}
