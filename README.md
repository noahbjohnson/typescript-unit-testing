# An Introduction to Unit Testing in Typescript
This repo will endeavour to provide a basic overview of writing and using unit tests in Typescript. Most of the concepts covered also apply to vanilla Node JS and other Javascript supersets.

> This guide assumes a basic working knowledge of Typescript

## Preface

### Test Levels
Any test-driven development has one goal: _consistency_. This goal is usually achieved by writing a number of tests for the desired functionality or current api specifications. There are three (sometimes four) main types of software testing <sup>1</sup>.

> This test-level information is primarily needed for understanding the context, you can skip ahead if you want.

This is a more classical approach to test levels:

1. **Unit or Component Testing**

    _Test object_: components, program modules, functions, programs, database modules, SQL requests, depending on the granularity of the software or system to test.

    _Objective_: detect failures in the components, verifies whether the mode of operation of the component, module, program, object, class, etc., is functional or non-functional.

    _Entry criteria_: the component is available, compiled, and executable in the test environment; the specifications are available and stable.

    _Exit criteria_: the required coverage level, functional and technical (or non-functional), has been reached; defects found have been corrected; and the corrections have been verified.

    _Transparency_: Can be based on the structure with source access (white-box tests) or on the requirements or the interfaces (black-box tests).

    _Responsible party_: Developers

2. Integration Testing

    _Test object_: components, infrastructure, interfaces, database systems, and file systems.

    _Objective_: detect failures in the interfaces and exchanges between components.

    _Reference material_: preliminary and detailed design documentation for the software or system, software or system architecture, use cases, workflow, etc.

    _Entry criteria_: at least two components that must exchange data are available, and have passed component test successfully.

    _Exit criteria_: all components have been integrated and all message types (sent or received) have been exchanged without any defect for each existing interface.

    _Transparency_: Can be based on the architecture of the code (white-box tests) or on the specifications (black-box tests).

    _Responsible party_: Developers

3. End-to-end Testing (E2E or System Testing)
   
    _Test object_: the complete software or system, its documentation (user manual, maintenance and installation documentation, etc.), the software configuration and all the components that are linked to it (installation and de-installation scripts, etc.).

    _Objective_: detect failures in the software, to ensure that it corresponds to the requirements and specifications, and that it can be accepted by the users.

    _Reference material_: requirements and specifications of the software or system, use cases, risk analysis, applicable norms, and standards.

    _Entry criteria_: all components have been correctly integrated, all components are available.

    _Exit criteria_: the functional and technical (i.e. non-functional) level of coverage has been reached; must-fix defects have been corrected and their fixes have been verified; the summary test report has been written and approved.

    _Transparency_: Usually based on specifications (black-box tests). However, it is possible to base some tests on the architecture of the system — call graph for example — and to execute some white-box tests.

    _Responsible party_: Independent test teams and internal or external QA.

4. Acceptance Testing

    _Test object_: the complete software or system, its documentation, all necessary configuration items, forms, reports and statistics from previous test levels, user processes.

   _Objective_: obtain customer or user acceptance of the software.

    _Reference material_: contract, specifications, and requirements for the system or software, use cases, risk analysis, applicable standards, and norms.

    _Entry criteria_: all components have been correctly tested at system test level and are available, the software installs correctly, the software is considered sufficiently mature for delivery.

    _Exit criteria_: the expected coverage level has been reached; must-fix defects have been corrected and the fixes have been verified; user and customer representatives who participated in the acceptance test accept that the software or system can be delivered in production.

    _Transparency_: Acceptance test are mostly black-box tests (based on requirements and specifications), though some structure based tests can be executed.

    _Responsible party_: Internal QA/Testers, internal leadership, and end users.

Mike Cohn coined the term "test pyramid" to simplify this relatively complicated arrangement<sup>2</sup>. This more modern model is more geared toward cloud-based app and microservices, but is commonly dismissed as overly simplistic.

![](images/intro/testPyramid.png)

The most important takeaway from Cohn's method is _unit tests should be the foundation of development_. 


### Why Typescript?
It would be just as easy, probably easier, to cover this topic without using static typing. However, Typescript is quickly becoming the standard for developing large codebases and node packages. For projects that seek to have a wide developer base and a high level of maintainability, Typescript is the best option for Javascript development.

### Project Organization
This repo is broken up to a number of sections, each of which has a corresponding folder containing example code of the concepts covered. Each section will have two basic npm scripts to run `npm install` to install the section's dependencies, and `npm test` to run the unit test(s).

## Section One: Pure Functions and Working With Typescript

This is the most basic level of unit test, and is a good place to start the conversation. A "pure function" is defined as a function that's return value, _f_(x) is the same for the same given argument(s), x. <sup>3</sup>

![](images/section_one/Function_machine2.svg)

To test a pure function, a number of test _cases_ of expected input and output are designated, and they're run until the function passes all the test cases. This is technically a type of black-box testing because the test doesn't care what happens to get the expected output.

### Defining Requirements
We'll write a function called _doubleMe_ that will: "return double the value of a given integer"

Borrowing from our textbook definition, we can describe this test as:


- _Test object_: our function _doubleMe_
- _Objective_: test a function for compliance with the goal
- _Entry criteria_: the function executes with one test case
- _Exit criteria_: all test cases pass
- _Transparency_: black-box

### Test Cases
Our test case will consist of an _in_ number and an _out_ number.

```ts
/**
 * A test case and its expected outcome
 **/
interface Case {
  inNum: number
  outNum: number
}
```

Now that we've defined what our test case will look like, let's create a few.

```ts
/**
 * Test cases for doubleMe
 **/
const cases: Case[] = [
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
]
```

Negatives!? When we started writing our test cases, we hadn't even thought about negative numbers. Discovering new and weird edge cases is one of the best parts of testing! It drives standardization and forces the developer to define clear rules and expectations (aka API and documentation) for their code.

Writing seven test cases for such a trivial function might be excessive. ISTQB's second principle of software testing is that _it is impossible to test everything_<sup>1</sup>, and this is especially true when tests are _expensive_ or take a lot of time to run. If tests are too inconvenient, they might be circumvented for expedience, which completely defeats the purpose.

Choosing which test cases to include is a tough balancing act that is part of risk management for a project, and the list may change a number of times throughout the development life cycle. 

### The Function

Now we need to write the function to test! We've written our cases already, so we can have a more descriptive description.

```ts
/**
 * Returns an integer double the distance from zero as the input
 **/
function doubleMe (inNum: number): number {
  return inNum + inNum
}
```

### Test Caller Function

There are countless tools available for testing software more easily, but for this first one, we'll do it manually for demonstration.

```ts
/**
 * Runs a provided function with the provided positional argument and 
 * checks the result against the provided expected result
 **/
function pureTest (inputValue: number, expectedOutputValue: number, functionToTest: any): void {
  const outputValue = functionToTest(inputValue)
  if (expectedOutputValue !== outputValue) {
    console.error(`Expected output for ${inputValue} is ${expectedOutputValue}. Function returned ${outputValue}`)
  } else {
    console.log('ok', `${expectedOutputValue} = ${outputValue}`)
  }
}

/**
 * Call the test for each case
 */
for (const c of cases){
   pureTest(Number(c.inNum), Number(c.outNum), doubleMe)
}
```

### NPM Package Setup

> Reminder: you can view the example in `sections/one`

When working in Typescript there are two very important node 'scripts' that we can define. `npm run build` will transpile the Typescript to Javascript, and `npm test` will run the tests. For this first section things are very simple, so we can daisy chain those two into one test script.

 - Make a new folder and set it as the working directory, we'll use `mkdir one && cd one`
 - Initialize the node package with `npm init` you can leave all the prompts at default.
 - Create your tsconfig.json file with `npx tsc --init`
 - Run `npm -install --save typescript` to install the typescript package

Open the newly created `package.json` file in your text editor and add these scripts:

```json
{
  "name": "section-one",
  "main": "index.js",
  "scripts": {
    "test": "npm run build && node index.js",
    "build": "tsc"
  },
  "dependencies": {
    "typescript": "^3.7.3"
  }
}
```

Finally, create `index.ts`. This is where all of our code above will live.

### Running Tests

Now all we need to do is type `npm test` in the shell and our code will automatically transpile to JS and test itself!

Your output should look something like this:
```sh
Computer:one username$ npm test

> section-one@1.0.0 test /Users/username/one
> npm run build && node index.js


> section-one@1.0.0 build /Users/username/one
> tsc

ok 0 = 0
ok 20200000200000 = 20200000200000
ok 2 = 2
ok 662 = 662
ok -200 = -200
ok -25770 = -25770
```

## Section Two: Using a Framework

## Section Three: Handling Errors

## Section Four: Test Setup and Cleanup

# References

1. Homès, B. (2012). Fundamentals of software testing.
2. https://martinfowler.com/articles/practical-test-pyramid.html
3. https://en.wikipedia.org/wiki/Function_(mathematics)