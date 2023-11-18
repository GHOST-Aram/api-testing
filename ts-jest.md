# Configuring Jest for Typescript Unit Tests

Jest if Unit testing library for JavaScript. Testing JavaScript code with Jest is straight forward and doesn't require any additional configuration. When it comes to testing Typescript code without compiling it to JavaScript first, a few configurations are required. There are two way of setting up jest for Typescript unit test; via babel or `ts-jest`. Babel is a popular multipurpose transpiler for JavaScript. `ts-jest` is an extension of the Typescript compiler tailored to work with Jest. In this article, we will explore and demostrate how to configure Jest to test Typescript code via `ts-jest`.


To create a Typescript and Jest testing environment, we will execute the following sequence of activities:

1. Create working directory and initialize npm
2. Install Typescript
3. Configure Typescript
4. Install jest and related dependencies
5. Configure jest for Typescript
6. Try it out

Let us start by creating an npm initialized working directory.

## 1. Create working directory and initialize npm
First and foremost, we need a directory that will contain all our dependencies, source files, testing files and configuration files. In this step we will create a directory called `jest-ts-tests` and intialize it as a node project directory.

Create directory named `jest-ts-tests` and run

```
npm init 
```

to generate `package.json` file

By executing the above instructions, we now have a directory ready for use. Let us go and install Typescript in the next step.

## 2. Install Typescript
In the previous step, we created a directory for us to work on. In this step we will install Typescript as a development dependency as follows.

```
Run npm i -D typescript
```

We have successfully installed Typescript, let us configure it in the next step.

## 3. Configure Typescript
We will install ready to use Typescript base configurations instead of starting from scratch. In this article we will use Typescript base configurations for node version 20. If you are using a different version of node, visit the [tsconfig bases](https://github.com/tsconfig/bases) docs to find out what you need. You can also create a Typescrit configuration file with settings that work for you.

Run the following command to install base Typescript configurations for node version 20.

```
npm i -D @tsconfig/node20
```

Create `tsconfig.json` file and paste the following configs.

```
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 20",
  "_version": "20.1.0",

  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node16",
    "outDir": "./build",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}

```

## 4. Install jest and related dependencies.
We are now ready to write Typescript code after installing and configuring Typescript in the previous steps. In this step, we will install jest and all the necessary dependencies related to it.

Run the following command to install jest and ther other dependencies.

```
npm i -D jest ts-jest @types/jest @jest/globals
```

We need `ts-jest` to compile Typescript for jest and `@jest/globals` to provide jest global global utilities for typescript. 

## 5. Configure Jest for Typescript
In this step, we will tell Jest to execute `.ts` files with ts-jest. To complete this configuration, we will generate a jest configuration file with `ts-jest` presets using the following command.

```
npx ts-jest config:init
```

Executing the above command generates a jest configuration file with `ts-jest` as a preset. 

Well done, let us edit our npm test scripts in the next step.

## 6. Edit `package.json` test script.
We want to be able to run tests easily by using a simple npm command. To enable the command, edit the script object in `package.json` as follows:

```
 "scripts": {
    "test": "jest --watch",
}
```
The setting above allows us to run tests using the `npm test` command. The `--watch` flag tells jest to run tests on every change.

Next, we proceed to testing to find verify our configurations.

## 7. Try it out.
In the previous sections, we have installed all the required dependenciies for testing Typescript with jest. In this section we will write a simple function and test is to verify that our configurations are on point.

Create `index.ts` file and export a simple function that you want to test. Do not finish the implementation until you write a failing test.

```
export const sum(num1: number, num2: number): number =>{
    
}
```

Create `index.test.ts` and import `sum`

```
index.test.ts

import {sum} from `index`
```

Import jest globals

```
index.test.ts

import {sum} from `index`
import { describe, test, expect } from "@jest/globals"
```

Write test

```
index.test.ts

import {sum} from `index`
import { describe, test, expect } from "@jest/globals"

describe('Sum function', () =>{
    test('Returns correct value', () =>{
        expect(sum(2, 3)).toEqual(5)
    })
})
```

Run the following command to begin your tests:

```
npm test
```

Edit your `sum` function until your test passes. 

Congratulations! That's the end of configuring jest for Typescript unit tests. We have created a working test environment for Typescript using jest and ts-jest. If you are interested in learning other ways of testing typescript code with jest, feel free to visit the document on [using jest with typescript](https://jestjs.io/docs/getting-started#using-typescript).